import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppURL from "../../api/AppURL";
import { toast } from 'react-toastify';
 
const toInputDate = (dateStr) => {
  if (!dateStr || typeof dateStr !== "string") {
    console.warn("Ngày sinh không hợp lệ hoặc thiếu:", dateStr);
    return "";
  }

  const cleaned = dateStr.trim();

  if (/^\d{4}-\d{2}-\d{2}T/.test(cleaned)) {
    const isoDate = cleaned.split("T")[0];
    console.log("Nhận diện ISO 8601 → lấy phần ngày:", cleaned, "→", isoDate);
    return isoDate; 
  }

 
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) {
    console.log("Đã là yyyy-MM-dd → dùng trực tiếp:", cleaned);
    return cleaned;
  }

  
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(cleaned)) {
    const [d, m, y] = cleaned.split("/");
    const day = String(parseInt(d, 10)).padStart(2, "0");
    const month = String(parseInt(m, 10)).padStart(2, "0");
    const result = `${y}-${month}-${day}`;
    console.log("Chuyển dd/MM/yyyy → yyyy-MM-dd:", cleaned, "→", result);
    return result;
  }

  if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(cleaned)) {
    const [d, m, y] = cleaned.split("-");
    const day = String(parseInt(d, 10)).padStart(2, "0");
    const month = String(parseInt(m, 10)).padStart(2, "0");
    const result = `${y}-${month}-${day}`;
    console.log("Chuyển dd-MM-yyyy → yyyy-MM-dd:", cleaned, "→", result);
    return result;
  }

  console.warn("Không nhận diện được định dạng ngày sinh:", cleaned);
  return "";
};

const toAPIDate = (dateStr) => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
};

export default function UpdateSV() {
  const { masv } = useParams();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    masv: "",
    hoten: "",
    gioitinh: "",
    email: "",
    ngaysinh: "",
    sdt: "",
    malop: "",
  });

  const [lops, setLops] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Load danh sách lớp */
  useEffect(() => {
    fetch(AppURL.Listlop)
      .then((res) => res.json())
      .then((data) => setLops(data))
      .catch((err) => {
        console.error("Lỗi load lớp:", err);
        alert("Không tải được danh sách lớp");
      });
  }, []);

  /* Load thông tin sinh viên */
  useEffect(() => {
    if (!masv) return;

    fetch(AppURL.Listsv)
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi server");
        return res.json();
      })
      .then((data) => {
        const sv = data.find((item) => item.masv === masv);

        if (!sv) {
          toast.error("Không tìm thấy sinh viên với mã: " + masv);
          navigate("/dssv");
          return;
        }

        const formattedNgaysinh = toInputDate(sv.ngaysinh);

        setInputs({
          masv: sv.masv || "",
          hoten: sv.hoten || "",
          gioitinh: sv.gioitinh || "",
          email: sv.email || "",
          ngaysinh: formattedNgaysinh,
          sdt: sv.sdt || "",
          malop: sv.malop || "",
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi fetch sinh viên:", err);
        toast.error("Lỗi tải dữ liệu sinh viên");
        setLoading(false);
      });
  }, [masv, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = () => {
    if (!inputs.hoten.trim() || !inputs.ngaysinh || !inputs.malop) {
      toast.warning("Vui lòng nhập đầy đủ: Họ tên, Ngày sinh và Lớp!");
      return;
    }

    const payload = {
      ...inputs,
      ngaysinh: toAPIDate(inputs.ngaysinh),
    };

    fetch(`${AppURL.UpdateSV}/${masv}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Cập nhật thất bại!");
        toast.success("Cập nhật sinh viên thành công!");
        navigate("/dssv");
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message || "Có lỗi xảy ra khi cập nhật");
      });
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "50px" }}>Đang tải thông tin sinh viên...</div>;
  }

  return (
    <main className="main-update">
      <div className="formupdate">
        <h1>Cập nhật sinh viên</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <table>
            <tbody>
              <tr>
                <td><label>Mã SV</label></td>
                <td><input value={inputs.masv} disabled /></td>
              </tr>
              <tr>
                <td><label>Họ tên *</label></td>
                <td><input name="hoten" value={inputs.hoten} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>Giới tính</label></td>
                <td><input name="gioitinh" value={inputs.gioitinh} onChange={handleChange} placeholder="Nam / Nữ" /></td>
              </tr>
              <tr>
                <td><label>Email</label></td>
                <td><input type="email" name="email" value={inputs.email} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td><label>Ngày sinh *</label></td>
                <td>
                  <input
                    type="date"
                    name="ngaysinh"
                    value={inputs.ngaysinh}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><label>SĐT</label></td>
                <td><input name="sdt" value={inputs.sdt} onChange={handleChange} placeholder="0901234567" /></td>
              </tr>
              <tr>
                <td><label>Lớp *</label></td>
                <td>
                  <select name="malop" value={inputs.malop} onChange={handleChange} required>
                    <option value="">-- Chọn lớp --</option>
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
            <button type="button" onClick={() => navigate("/dssv")}>Cancel</button>
            <button type="button" onClick={submitForm}>Save</button>
          </div>
        </form>
      </div>
    </main>
  );
}