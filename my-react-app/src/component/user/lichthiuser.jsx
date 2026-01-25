import { useEffect, useState } from "react";
import AppURL from "../../api/AppURL";
import { data, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LichThiGiangVien() {
  const [lichThi, setLichThi] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Lấy phân công lịch thi của giảng viên
 useEffect(() => {
  if (!user?.email) return;

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn chưa đăng nhập!");
        return;
      }

      const res = await fetch(`${AppURL.PCGV}/${user.email}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server trả về:", text);
        throw new Error(`HTTP ${res.status}`);
      }

      const json = await res.json();
      setLichThi(json.data || []);
    } catch (err) {
      console.error("Lỗi lấy phân công:", err);
      setLichThi([]);
    }
  };

  fetchData();
}, [user?.email]);



  // Kiểm tra có phải ngày hôm nay hay không
  const isToday = (dateString) => {
    const d = new Date(dateString);
    const t = new Date();
    return (
      d.getDate() === t.getDate() &&
      d.getMonth() === t.getMonth() &&
      d.getFullYear() === t.getFullYear()
    );
  };

  // Bắt đầu phiên điểm danh
  const startDiemDanh = async (malichthi) => {
    if (!malichthi) {
      alert("Mã lịch thi không hợp lệ!");
      return;
    }

    try {
      const res = await fetch(
        "https://be.luongminhkhanhan.io.vn/api/luudiemdanh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({ malichthi }),
        }
      );

      const json = await res.json();
      console.log("Kết quả từ server:", json);

      if (json.status && json.data?.madiemdanh) {
        navigate(`/diemdanh/${json.data.madiemdanh}`);
      } else {
        alert(json.message || "Không tạo được phiên điểm danh!");
      }
    } catch (err) {
      console.error("Lỗi kết nối server:", err);
      toast.error("Không thể kết nối server!");
    }
  };

  return (
    <div>
      {lichThi.length === 0 ? (
        <p>Không có lịch thi</p>
      ) : (
        <div className="lichthi-giangvien">
          {lichThi.map((lt) => (
            <form
              key={lt.id || lt.malichthi}
              className="form-lichthi"
              onSubmit={(e) => e.preventDefault()}
            >
              <label>Mã lịch thi: <input value={lt.malichthi} readOnly /></label>
              <label>Môn thi: <input value={lt.monthi} readOnly /></label>
              <label>Ngày thi: <input type="text" value={lt.ngaythi_format} readOnly /></label>
              <label>Giờ bắt đầu: <input type="time" value={lt.giobatdau} readOnly /></label>
              <label>Giờ kết thúc: <input type="time" value={lt.gioketthuc} readOnly /></label>
              <label>Phòng thi: <input value={lt.phongthi} readOnly /></label>
              <label>Mã lớp: <input value={lt.malop} readOnly /></label>

              {isToday(lt.ngaythi) ? (
                <button
                  type="button"
                  style={{ backgroundColor: "#e64a19" }}
                  onClick={() => startDiemDanh(lt.malichthi)}
                >
                  Điểm danh
                </button>
              ) : (
                <button type="button" disabled style={{ backgroundColor: "#9b7164ff" }}>
                  Điểm danh
                </button>
              )}
            </form>
          ))}
        </div>
      )}
    </div>
    
  );
}
