import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppURL from "../../api/AppURL";

export default function KetThuc() {
  const { email: rawEmail } = useParams();
  const [listdiemdanh, setListDiemDanh] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedBuoi, setSelectedBuoi] = useState(null);
  const [chiTietDiemDanh, setChiTietDiemDanh] = useState([]);
  const [loadingChiTiet, setLoadingChiTiet] = useState(false);
  const [errorChiTiet, setErrorChiTiet] = useState(null);

  useEffect(() => {
    const email = decodeURIComponent(rawEmail || "");
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Email không hợp lệ hoặc thiếu");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchListDD = async () => {
      setLoading(true);
      setError(null);

      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const token = userData?.access_token;

        const response = await fetch(`${AppURL.ListDiemDanh}/${encodeURIComponent(email)}`, {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!response.ok) {
          let errorMessage = `HTTP ${response.status}`;
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            try {
              const errJson = await response.json();
              errorMessage += `: ${errJson.message || JSON.stringify(errJson)}`;
            } catch {}
          } else {
            try {
              const errText = await response.text();
              errorMessage += `: ${errText.trim()}`;
            } catch {}
          }
          throw new Error(errorMessage);
        }

        const json = await response.json();
        const list = Array.isArray(json.data) ? json.data : Array.isArray(json) ? json : [];
        setListDiemDanh(list);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Lỗi tải danh sách:", err);
          setError(err.message || "Không thể kết nối server");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchListDD();

    return () => controller.abort();
  }, [rawEmail]);

  const fetchChiTietDiemDanh = async (madiemdanh, malop) => {
    setLoadingChiTiet(true);
    setErrorChiTiet(null);
    setSelectedBuoi(madiemdanh);

    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const token = userData?.access_token;

      const response = await fetch("https://be.luongminhkhanhan.io.vn/api/quanlydiemdanh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          madiemdanh: madiemdanh,
          malop: malop,  
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.message || `HTTP ${response.status}`);
      }

      const json = await response.json();
      setChiTietDiemDanh(Array.isArray(json.data) ? json.data : []);
    } catch (err) {
      console.error("Lỗi tải chi tiết:", err);
      setErrorChiTiet(err.message || "Không thể tải chi tiết điểm danh");
    } finally {
      setLoadingChiTiet(false);
    }
  };

  const closeChiTiet = () => {
    setSelectedBuoi(null);
    setChiTietDiemDanh([]);
    setErrorChiTiet(null);
  };

  if (loading) {
    return (
      <main className="main-wrapper">
        <p style={{ textAlign: "center", padding: "40px" }}>Đang tải danh sách điểm danh...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="main-wrapper">
        <div style={{ textAlign: "center", padding: "40px", color: "red" }}>
          <p><strong>Lỗi:</strong> {error}</p>
          <button onClick={() => window.location.reload()}>
            Thử lại
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="main-wrapper">
      <div className="student-table-container">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Danh sách các buổi điểm danh
        </h2>

        {listdiemdanh.length === 0 ? (
          <p style={{ textAlign: "center", padding: "50px", color: "#666", fontSize: "18px" }}>
            Không có dữ liệu điểm danh nào.<br />
            <small>Có thể chưa có buổi nào được tạo hoặc kết thúc.</small>
          </p>
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
              {listdiemdanh.map((item) => (
                <tr
                  key={item.madiemdanh}
                 
                  onClick={() => fetchChiTietDiemDanh(item.madiemdanh, item.malop)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: selectedBuoi === item.madiemdanh ? "#e3f2fd" : "transparent",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 
                    selectedBuoi === item.madiemdanh ? "#e3f2fd" : "transparent"
                  }
                >
                  <td><strong>{item.madiemdanh}</strong></td>
                  <td>{item.malichthi}</td>
                  <td>{item.monthi}</td>
                  <td>{item.ngaythi}</td>
                  <td>{item.giobatdau}</td>
                  <td>{item.gioketthuc}</td>
                  <td>{item.malop}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

       
        {selectedBuoi && (
          <div style={{
            marginTop: "40px",
            padding: "20px",
            background: "#f8f9fa",
            borderRadius: "10px",
            border: "1px solid #dee2e6"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0 }}>
                Chi tiết điểm danh - Mã buổi: <strong>{selectedBuoi}</strong>
              </h3>
              <button onClick={closeChiTiet} style={{
                background: "#dc3545",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "5px",
                cursor: "pointer"
              }}>
                Đóng
              </button>
            </div>

            {loadingChiTiet && <p>Đang tải chi tiết...</p>}
            {errorChiTiet && <p style={{ color: "red" }}>Lỗi: {errorChiTiet}</p>}

            {!loadingChiTiet && !errorChiTiet && chiTietDiemDanh.length === 0 && (
              <p style={{ textAlign: "center", color: "#666" }}>
                Chưa có sinh viên nào điểm danh trong buổi này.
              </p>
            )}

            {!loadingChiTiet && !errorChiTiet && chiTietDiemDanh.length > 0 && (
              <table className="student-table" style={{ width: "100%", marginTop: "10px" }}>
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
                  {chiTietDiemDanh.map((sv, idx) => (
                    <tr key={idx}>
                      <td>{sv.masv}</td>
                      <td>{sv.hoten || "-"}</td>
                      <td>{sv.malop}</td>
                      <td>
                        <span style={{
                          color: sv.tinhtrang === 1 ? "green" : "red",
                          fontWeight: "bold"
                        }}>
                          {sv.tinhtrang === 1 ? "Có mặt" : "Vắng"}
                        </span>
                      </td>
                      <td>
                        <span style={{
                          color: sv.trangthai?.includes("Đã") ? "blue" : "orange",
                          fontWeight: "bold"
                        }}>
                          {sv.trangthai || "Chưa điểm danh"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </main>
  );
}