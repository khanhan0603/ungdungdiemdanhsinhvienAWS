import { useEffect, useState } from "react";
import AppURL from "../../api/AppURL";
import ExcelDisplay from "../uploadfile/importLT";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function LichThi() {
  const [lichthis, setLichThi] = useState([]);
  const [giangviens, setGV] = useState([]);
  const [selectedGV, setSelectedGV] = useState({});
  const [phancong, setPhanCong] = useState([]);

    const getToken = () => localStorage.getItem("token");

  // Lấy lịch thi
 // Lấy lịch thi
const fetchLT = async () => {
  try {
    const res = await fetch(AppURL.ListLT);
    const json = await res.json();

    // Nếu API trả về { data: [...] }, dùng json.data, nếu trả về mảng trực tiếp thì dùng json
    const list = Array.isArray(json.data) ? json.data : Array.isArray(json) ? json : [];
    setLichThi(list);
  } catch (err) {
    console.error("Lỗi tải lịch thi:", err);
    setLichThi([]);
  }
};

useEffect(() => {
  console.log("Danh sách lịch thi:", lichthis);
}, [lichthis]);



  // Lấy danh sách giảng viên
  const fetchGV = async () => {
    try {
      const res = await fetch(AppURL.Listgv, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();

      // ✅ LUÔN ÉP VỀ MẢNG
      setGV(Array.isArray(json.data) ? json.data : []);
    } catch (err) {
      console.error("Lỗi tải giảng viên:", err);
      setGV([]);
    }
  };

  // Lấy phân công
const fetchPC = async () => {
  try {
    const res = await fetch(AppURL.ListPC);
    const json = await res.json();
    const pcList = Array.isArray(json.data) ? json.data : [];
    setPhanCong(pcList);
  } catch (err) {
    console.error("Lỗi tải phân công:", err);
    setPhanCong([]);
  }
};


  // Khi lichthis hoặc phancong thay đổi, khởi tạo selectedGV
  useEffect(() => {
    if (lichthis.length === 0) return;

    const init = {};
    lichthis.forEach((lt) => {
      init[lt.malichthi] = ["", "", ""]; // mặc định 3 vị trí

      const pc = phancong.find((p) => p.malichthi === lt.malichthi);
      if (pc && pc.giangviens) {
        pc.giangviens.forEach((gv) => {
          if (gv.pivot.vaitro === "Giám thị 1") init[lt.malichthi][0] = gv.magv;
          if (gv.pivot.vaitro === "Giám thị 2") init[lt.malichthi][1] = gv.magv;
          if (gv.pivot.vaitro === "Giám thị 3") init[lt.malichthi][2] = gv.magv;
        });
      }
    });

    setSelectedGV(init);
  }, [lichthis, phancong]);

  // Fetch dữ liệu khi load trang
  useEffect(() => {
    fetchLT();
    fetchGV();
    fetchPC();
  }, []);

  // Xóa lịch thi
  const handleDelete = async (malichthi) => {
    if (!window.confirm("Bạn có muốn xóa?")) return;

    try {
      await fetch(`${AppURL.LTDelete}/${malichthi}`, { method: "POST" });
      alert("Xóa thành công!");
      fetchLT();
      fetchPC();
    } catch {
      alert("Không thể xóa!");
    }
  };

  // Kiểm tra trùng lịch
  const checkConflict = (magv, ngay, start, end, malichthi) => {
    if (!magv) return false;

    for (let lt of lichthis) {
      const assignedGVs = phancong.find((p) => p.malichthi === lt.malichthi)?.giangviens || [];

      const allGVs = [lt.gv1, lt.gv2, lt.gv3, ...assignedGVs.map((g) => g.magv)];

      if (allGVs.includes(magv)) {
        if (lt.ngaythi === ngay && lt.malichthi !== malichthi) {
          const overlap = !(end <= lt.giobatdau || start >= lt.gioketthuc);
          if (overlap) return true;
        }
      }
    }

    return false;
  };

const handleSelectGV = (malichthi, index, magv) => {
  // Luôn cho phép bỏ chọn (magv = "")
  if (!magv) {
    setSelectedGV((prev) => {
      const newList = [...(prev[malichthi] || ["", "", ""])];
      newList[index] = "";
      return { ...prev, [malichthi]: newList };
    });
    return;
  }

  const currentList = selectedGV[malichthi] || ["", "", ""];

  // Kiểm tra trùng: không cho chọn cùng 1 GV ở 2 vị trí khác nhau
  if (currentList.includes(magv) && currentList[index] !== magv) {
    toast.warning("Giảng viên này đã được chọn ở vị trí khác trong ca thi này!");
    return;
  }

  // Kiểm tra trùng lịch
  const currentLT = lichthis.find((lt) => lt.malichthi === malichthi);
  if (currentLT) {
    const { ngaythi, giobatdau, gioketthuc } = currentLT;
    if (checkConflict(magv, ngaythi, giobatdau, gioketthuc, malichthi)) {
      toast.warning("Giảng viên này đã gác một ca trùng thời gian!");
      return;
    }
  }

  // Cập nhật đúng cách: tạo mảng mới
  const newList = [...currentList];
  newList[index] = magv;
  setSelectedGV((prev) => ({
    ...prev,
    [malichthi]: newList,
  }));
};

  // Lưu phân công
const handleSubmit = async () => {
  try {
    let hasChanges = false;
    const roles = ["Giám thị 1", "Giám thị 2", "Giám thị 3"];

    for (const malichthi in selectedGV) {
      const selectedList = selectedGV[malichthi] || ["", "", ""];
      const currentPC = phancong.find((p) => p.malichthi === malichthi);
      const assignedGVs = currentPC?.giangviens || [];

      for (let i = 0; i < selectedList.length; i++) {
        const newMagv = (selectedList[i]?.trim() || "") || "";
        const role = roles[i];

        const existing = assignedGVs.find((g) => g.pivot?.vaitro === role);
        const oldMagv = existing?.magv || "";

        // Không thay đổi → bỏ qua
        if (newMagv === oldMagv) {
          continue;
        }

        hasChanges = true;

        // === TRƯỜNG HỢP XÓA (bỏ chọn) ===
        if (!newMagv && oldMagv) {
          await axios.post(`${AppURL.DeletePC}/${malichthi}/giangvien/${oldMagv}`);
          continue;
        }

        // === TRƯỜNG HỢP THÊM MỚI HOẶC THAY ĐỔI ===
        // Dùng capNhatPhanCong — backend sẽ tự xóa cũ (nếu có) và gán mới
        await axios.post(`${AppURL.UpdatePC}/${malichthi}`, {
          magv: newMagv,
          vaitro: role,
        });
      }
    }

    if (!hasChanges) {
      toast.info("Không có thay đổi nào để lưu.");
      return;
    }

    toast.success("Phân công giám thị đã được cập nhật thành công!");
    await fetchPC();

  } catch (err) {
    console.error("Lỗi lưu phân công:", err.response?.data || err);
    const serverMsg = err.response?.data?.message || "Lỗi khi lưu phân công!";

    let detailMsg = serverMsg;
    if (serverMsg.includes("trùng lịch")) detailMsg = serverMsg;
    if (serverMsg.includes("Vai trò")) detailMsg = serverMsg;
    if (serverMsg.includes("magv")) detailMsg = "Vui lòng chọn giảng viên hợp lệ.";

    toast.error(detailMsg);
  }
};
  return (
    <main className="main-wrapper">
      <ExcelDisplay onImportSuccess={fetchLT} />

      <div className="student-table-container">
        <table className="student-table">
          <thead>
            <tr>
              <th>Mã lịch thi</th>
              <th>Môn thi</th>
              <th>Ngày thi</th>
              <th>Giờ bắt đầu</th>
              <th>Giờ kết thúc</th>
              <th>Phòng thi</th>
              <th>Lớp</th>
              <th colSpan="3">Phân công giám thị</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {lichthis.map((lt) => (
              <tr key={lt.malichthi}>
                <td>{lt.malichthi}</td>
                <td>{lt.monthi}</td>
                <td>{lt.ngaythi_format}</td>
                <td>{lt.giobatdau}</td>
                <td>{lt.gioketthuc}</td>
                <td>{lt.phongthi}</td>
                <td>{lt.malop}</td>

                {[0, 1, 2].map((i) => {
  const currentValue = selectedGV[lt.malichthi]?.[i] || "";

  return (
    <td key={i}>
      <select
        className="form-control"
        value={currentValue}
        onChange={(e) => handleSelectGV(lt.malichthi, i, e.target.value)}
      >
        <option value="">--Giám thị--</option>
        {giangviens.map((gv) => {
          const currentList = selectedGV[lt.malichthi] || ["", "", ""];
          // Disable nếu GV đã được chọn ở vị trí khác
          const isSelectedElsewhere =
            currentList.includes(gv.magv) && currentList[i] !== gv.magv;

          return (
            <option
              key={gv.magv}
              value={gv.magv}
              disabled={isSelectedElsewhere}
              style={{
                color: isSelectedElsewhere ? "#999" : "black",
                fontStyle: isSelectedElsewhere ? "italic" : "normal",
              }}
            >
              {gv.hoten}
            </option>
          );
        })}
      </select>
    </td>
  );
})}

                <td className="btn-group-lt">
                  <Link
                    className="btn-update-lt"
                    to={`/updatelt/${lt.malichthi}`}
                  >
                    Edit
                  </Link>

                  <button
                    style={{ marginTop: "3px" }}
                    className="btn-delete"
                    onClick={() => handleDelete(lt.malichthi)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn-phancong" onClick={handleSubmit}>
          Lưu phân công
        </button>
      </div>
    </main>
  );
}
