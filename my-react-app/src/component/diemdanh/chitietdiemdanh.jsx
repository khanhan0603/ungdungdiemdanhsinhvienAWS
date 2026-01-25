import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


export default function ChiTietDiemDanh() {
  const { madiemdanh, malop, email } = useParams();
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChiTiet = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const token = userData?.access_token;

        const res = await fetch(
          "https://be.luongminhkhanhan.io.vn/api/quanlydiemdanh",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ madiemdanh, malop }),
          }
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        setList(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChiTiet();
  }, [madiemdanh, malop]);

  if (loading) return <p style={{ textAlign: "center", fontSize: "1.2rem", marginTop: "3rem" }}>Đang tải chi tiết...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center", fontSize: "1.2rem" }}>{error}</p>;

  return (
  <main className="main-wrapper">
    {/* Đưa nút Đóng ra ngoài container bảng, nằm trên cùng */}
    <div className="header-actions">
      <button className="close-button" onClick={() => navigate(`/kthucdiemdanh/${email}`)}>
        Đóng
      </button>
    </div>

    <div className="student-table-container">
      <div className="title-wrapper">
        <h3 className="chitietdiemdanh">Chi tiết điểm danh – {madiemdanh}</h3>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Lớp</th>
            <th>Tình trạng</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {list.map((sv, idx) => (
            <tr key={idx}>
              <td data-label="MSSV">{sv.masv}</td>
              <td data-label="Họ tên">{sv.hoten}</td>
              <td data-label="Lớp">{sv.malop}</td>
              <td data-label="Tình trạng">
                <span className={`status-badge ${sv.tinhtrang ? "status-present" : "status-absent"}`}>
                  {sv.tinhtrang ? "Có mặt" : "Vắng"}
                </span>
              </td>
              <td data-label="Trạng thái">{sv.trangthai || "Chưa điểm danh"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </main>

  );
}