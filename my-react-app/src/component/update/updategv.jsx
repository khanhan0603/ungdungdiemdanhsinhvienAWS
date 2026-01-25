import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppURL from "../../api/AppURL";
import { toast } from "react-toastify";

export default function UpdateGV() {
  const { magv } = useParams();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    hoten: "",
    email: "",
    sdt: "",
    manganh: "",
  });

  const [loading, setLoading] = useState(true);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (!magv) return;

    fetch(AppURL.Listgv)
      .then((res) => {
        if (!res.ok) throw new Error("Không kết nối được server");
        return res.json();
      })
      .then((res) => {
        let list = [];

        if (Array.isArray(res)) list = res;
        else if (Array.isArray(res.data)) list = res.data;
        else if (Array.isArray(res.gv)) list = res.gv;
        else throw new Error("Dữ liệu API không hợp lệ");

        const gv = list.find((i) => i.magv === magv);

        if (!gv) {
          toast.error("Không tìm thấy giảng viên");
          navigate("/dsgv");
          return;
        }

        setInputs({
          hoten: gv.hoten || "",
          email: gv.email || "",
          sdt: gv.sdt || "",
          manganh: gv.manganh || "",
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
        setLoading(false);
      });
  }, [magv, navigate]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async () => {
  try {
    const res = await fetch(`${AppURL.GVupdate}/${magv}`, {
      method: "POST", // hoặc PUT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });

    if (!res.ok) {
      const text = await res.text();   // 🔥 CỰC KỲ QUAN TRỌNG
      console.error("Backend error HTML:", text);
      throw new Error("Server lỗi – xem console để biết chi tiết");
    }

    const data = await res.json();
    toast.success("Cập nhật thành công");
    navigate("/dsgv");

  } catch (err) {
    console.error("Lỗi cập nhật:", err);
    toast.error(err.message);
  }
};

  const back = () => navigate("/dsgv");

  if (loading) {
    return <div style={{ padding: 40, textAlign: "center" }}>Đang tải dữ liệu...</div>;
  }

  /* ================= UI ================= */
  return (
    <main className="main-update">
      <div className="formupdate">
        <h1>Cập nhật giảng viên</h1>

        <table>
          <tbody>
            <tr>
              <td>Mã GV</td>
              <td><input value={magv} disabled /></td>
            </tr>

            <tr>
              <td>Họ tên *</td>
              <td>
                <input
                  name="hoten"
                  value={inputs.hoten}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Email *</td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>SĐT</td>
              <td>
                <input
                  name="sdt"
                  value={inputs.sdt}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Mã ngành</td>
              <td><input value={inputs.manganh} disabled /></td>
            </tr>
          </tbody>
        </table>

        <div className="gr-btn-edit">
          <button onClick={back}>Cancel</button>
          <button onClick={submitForm}>Save</button>
        </div>
      </div>
    </main>
  );
}
