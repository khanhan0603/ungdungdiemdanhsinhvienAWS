import { useEffect, useState } from "react";
import { getInfo } from "../../services/authServicead";
import axios from "axios";
import AppURL from "../../api/AppURL";
import { toast } from "react-toastify";

export default function Account() {
  const [admin, setAdmin] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchAD = async () => {
      try {
        const data = await getInfo();
        setAdmin(data);
        setFormData(data); 
      } catch (err) {
        console.error("Lỗi lấy thông tin admin:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAD();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.post(
        `${AppURL.AdminUpdate}/${formData.id}`,
        formData
      );

      setAdmin(formData);
      setIsEditing(false);
      toast.success("Cập nhật thành công!");
    } catch (err) {
      console.error("Lỗi update admin:", err);
       toast.error("Cập nhật thất bại!");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!admin) return <div>Không có thông tin admin</div>;

  return (
  <main className="account">
    <div className="account-profile">
      
      {!isEditing && (
        <button
          className="btn-update"
          onClick={() => setIsEditing(true)}
        >
          Update
        </button>
      )}

      <table>
        <tbody>
          <tr>
            <td className="input-group">
              <input type="text" value={formData.id} readOnly />
              <label>ID</label>
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
            <td colSpan={2} className="input-group chucvu-group">
              <input
                type="text"
                name="chucvu"
                value={formData.chucvu}
                readOnly
              />
              <label>Chức vụ</label>

            
              {isEditing && (
                <button
                  className="btn-save"
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
