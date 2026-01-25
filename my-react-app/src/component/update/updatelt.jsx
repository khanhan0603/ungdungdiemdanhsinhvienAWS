import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppURL from "../../api/AppURL";
import { toast } from "react-toastify";

export default function UpdateLT() {
  const [inputs, setInputs] = useState({});
  const { malichthi } = useParams();
  const navigate = useNavigate();
  const [lops, setLops] = useState([]);

  // Load danh sách lớp
  useEffect(() => {
    fetch(AppURL.Listlop)
      .then((res) => res.json())
      .then((data) => setLops(data))
      .catch((err) => console.error(err));
  }, []);

  // HÀM LOAD 1 LỊCH THI — có thể gọi lại sau khi update
  const loadLT = () => {
  fetch(AppURL.ListLT)
    .then((res) => res.json())
    .then((json) => {
      const list = Array.isArray(json.data) ? json.data : [];
      const lt = list.find(
        (item) => String(item.malichthi) === String(malichthi)
      );

      if (lt) {
       
         if (lt.ngaythi) {
          lt.ngaythi = lt.ngaythi.slice(0, 10); // yyyy-MM-dd
        }

        setInputs(lt);
      } else {
        toast.warning("Không tìm thấy lịch thi!");
      }
    })
    .catch((err) => console.error("Lỗi fetch lịch thi:", err));
};


  // Chạy lần đầu
  useEffect(() => {
    loadLT();
  }, [malichthi]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const toAMPM = (time24) => {
    if (!time24) return "";
    let [h, m] = time24.split(":");
    h = parseInt(h, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${String(h).padStart(2, "0")}:${m} ${ampm}`;
  };

  // Submit form
 const submitForm = () => {
  const payload = { ...inputs };

  // yyyy-MM-dd → dd/MM/yyyy
  if (payload.ngaythi) {
    const [y, m, d] = payload.ngaythi.split("-");
    payload.ngaythi = `${d}/${m}/${y}`;
  }


  payload.giobatdau  = toAMPM(payload.giobatdau);
  payload.gioketthuc = toAMPM(payload.gioketthuc);

  fetch(`${AppURL.UpdateLT}/${malichthi}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Lỗi cập nhật!");
      toast.success("Cập nhật thành công!");
      navigate("/dslichthi");
    })
    .catch((err) => toast.error(err.message));
};



  const back = () => navigate("/dslichthi");

  return (
    <main className="main-update">
      <div className="formupdate">
        <h1>Cập nhật lịch thi</h1>
        <form>
          <table>
            <tbody>
              <tr>
                <td><label>Mã lịch thi</label></td>
                <td>
                  <input type="text" value={inputs.malichthi || ""} disabled />
                </td>
              </tr>

              <tr>
                <td><label>Môn thi</label></td>
                <td>
                  <input
                    type="text"
                    name="monthi"
                    value={inputs.monthi || ""}
                    onChange={handleChange}
                  />
                </td>
              </tr>

              <tr>
                <td><label>Ngày thi</label></td>
                <td>
                  <input
                    type="date"
                    name="ngaythi"
                    value={inputs.ngaythi || ""}
                    onChange={handleChange}
                  />
                </td>
              </tr>

              <tr>
                <td><label>Giờ bắt đầu</label></td>
                <td>
                  <input
                    type="time"
                    name="giobatdau"
                    value={inputs.giobatdau || ""}
                    onChange={handleChange}
                  />
                </td>
              </tr>

              <tr>
                <td><label>Giờ kết thúc</label></td>
                <td>
                  <input
                    type="time"
                    name="gioketthuc"
                    value={inputs.gioketthuc || ""}
                    onChange={handleChange}
                  />
                </td>
              </tr>

              <tr>
                <td><label>Phòng thi</label></td>
                <td>
                  <input
                    type="text"
                    name="phongthi"
                    value={inputs.phongthi || ""}
                    onChange={handleChange}
                  />
                </td>
              </tr>

              <tr>
                <td><label>Mã lớp</label></td>
                <td>
                  <select
                    name="malop"
                    value={inputs.malop || ""}
                    onChange={handleChange}
                  >
                    {lops.map((lop) => (
                      <option key={lop.malop} value={lop.malop}>
                        {lop.malop}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="gr-btn-edit">
            <button type="button" onClick={back}>Cancel</button>
            <button type="button" onClick={submitForm}>Save</button>
          </div>
        </form>
      </div>
    </main>
  );
}
