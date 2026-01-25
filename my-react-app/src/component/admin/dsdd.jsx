import { useState, useEffect } from "react";
import AppURL from "../../api/AppURL";

export default function KetThuc() {

  const [listdiemdanh, setListDiemDanh] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);     


  const fetchListDD = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(AppURL.ListDiemDanh);
      if (!res.ok) throw new Error("Lỗi khi tải danh sách điểm danh");
      
      const json = await res.json();

     
      const list = Array.isArray(json.data)
        ? json.data
        : Array.isArray(json)
        ? json
        : [];

      setListDiemDanh(list);
    } catch (err) {
      console.error(err);
      setError(err.message || "Lỗi khi tải dữ liệu");
      setListDiemDanh([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchListDD();
  }, []);


  if (loading) {
    return <main className="main-wrapper">Đang tải danh sách điểm danh...</main>;
  }


  if (error) {
    return <main className="main-wrapper">Lỗi: {error}</main>;
  }


  return (
    <main className="main-wrapper">
      <div className="student-table-container">
        {listdiemdanh.length === 0 ? (
          <p>Không có dữ liệu điểm danh</p>
        ) : (
          <table className="student-table">
            <thead>
              <tr>
                <th>Mã điểm danh</th>
                <th>Mã lịch thi</th>
                <th>Môn thi</th>
                <th>Ngày thi</th>
                <th>Giờ bắt đầu</th>
                <th>Giờ kết thúc</th>
                <th>Lớp</th>
              </tr>
            </thead>
            <tbody>
              {listdiemdanh.map((diemdanh) => (
                <tr key={diemdanh.madiemdanh}>
                  <td>{diemdanh.madiemdanh}</td>
                  <td>{diemdanh.malichthi}</td>
                  <td>{diemdanh.monthi}</td>
                  <td>{diemdanh.ngaythi}</td>
                  <td>{diemdanh.giobatdau}</td>
                  <td>{diemdanh.gioketthuc}</td>
                  <td>{diemdanh.malop}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
