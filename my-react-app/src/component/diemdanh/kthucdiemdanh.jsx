import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppURL from "../../api/AppURL";

export default function KetThuc() {
  const { email: rawEmail } = useParams();
  const navigate = useNavigate();

  const [listdiemdanh, setListDiemDanh] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const email = decodeURIComponent(rawEmail || "");

    const fetchList = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const token = userData?.access_token;

        const res = await fetch(
          `${AppURL.ListDiemDanh}/${encodeURIComponent(email)}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        setListDiemDanh(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [rawEmail]);

  if (loading) return <p style={{ textAlign: "center" }}>Đang tải...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <main className="main-wrapper">
       <div className="student-table-container">
      <div className="title-wrapper">
        <h3 className="chitietdiemdanh">Danh sách điểm danh</h3>
      </div>
      <table className="student-table">
        <thead>
          <tr>
            <th>Mã điểm danh</th>
            <th>Môn thi</th>
            <th>Ngày thi</th>
            <th>Lớp</th>
          </tr>
        </thead>
        <tbody>
          {listdiemdanh.map((item) => (
            <tr
              key={item.madiemdanh}
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(
                  `/kthucdiemdanh/${rawEmail}/${item.madiemdanh}/${item.malop}`
                )
              }
            >
              <td><strong>{item.madiemdanh}</strong></td>
              <td>{item.monthi}</td>
              <td>{item.ngaythi}</td>
              <td>{item.malop}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </main>
  );
}
