import { useEffect, useState } from "react";
import { getInfo } from "../../services/authService";
import axios from "axios";
import AppURL from "../../api/AppURL";
import { toast } from "react-toastify";
const getManganhFromLocal = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.manganh || "";
  } catch {
    return "";
  }
};

export default function Account() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    magv: "",
    hoten: "",
    email: "",
    sdt: "",
    manganh: "",   // 🔒 dữ liệu gửi backend
    tennganh: "",  // 👁️ chỉ hiển thị
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  /* ================== GET USER INFO ================== */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getInfo();
        const u = Array.isArray(userData) ? userData[0] : userData;

        const manganhLocal = getManganhFromLocal();

        setUser(u);
        setFormData({
          magv: u.magv || "",
          hoten: u.hoten || "",
          email: u.email || "",
          sdt: u.sdt || "",
          manganh: u.manganh || manganhLocal, // ✅ LUÔN CÓ
          tennganh: u.tennganh || "",
        });
      } catch (err) {
        console.error("Lỗi lấy thông tin user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  /* ================== HANDLE CHANGE ================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================== SAVE ================== */
  const handleSave = async () => {
    if (!formData.manganh) {
      toast.error("Không xác định được mã ngành!");
      return;
    }

    try {
      const payload = {
        hoten: formData.hoten,
        email: formData.email,
        sdt: formData.sdt,
        manganh: formData.manganh,
      };

      console.log("Payload gửi lên:", payload);

      await axios.post(
        `${AppURL.GVupdate}/${formData.magv}`,
        payload
      );

      setUser((prev) => ({ ...prev, ...payload }));
      setIsEditing(false);

      toast.success("Cập nhật thành công!");
    } catch (err) {
      console.error("Lỗi update:", err.response?.data);
      toast.error(err.response?.data?.message || "Cập nhật thất bại!");
    }
  };

  /* ================== RENDER ================== */
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Không có thông tin user</div>;
  return (
    <main className="account">
      <div className="account-profile">
        {!isEditing && (
          <button
            className="btn-update-acc"
            onClick={() => setIsEditing(true)}
          >
            Update
          </button>
        )}

        <table>
          <tbody>
            <tr>
              <td className="input-group">
                <input type="text" value={formData.magv} readOnly />
                <label>Mã giảng viên</label>
              </td>

              <td className="input-group">
                <input
                  type="text"
                  name="hoten"
                  value={formData.hoten}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
                <label>Họ và tên</label>
              </td>
            </tr>

            <tr>
              <td colSpan={2} className="input-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
                <label>Email</label>
              </td>
            </tr>

            <tr>
              <td className="input-group">
                <input
                  type="text"
                  name="sdt"
                  value={formData.sdt}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
                <label>Số điện thoại</label>
              </td>

              <td className="input-group chucvu-group">
                {/* CHỈ HIỂN THỊ */}
                <input
                  type="text"
                  value={formData.tennganh}
                  readOnly
                />
                <label>Ngành</label>

                {isEditing && (
                  <button
                    className="btn-save-acc"
                    onClick={handleSave}
                  >
                    Lưu
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
