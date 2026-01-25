import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import AppURL from "../../api/AppURL";

export default function ThongKeTheoNgay() {
  const [ngayBatDau, setNgayBatDau] = useState(null);
  const [ngayKetThuc, setNgayKetThuc] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin?.email) {
      setAdmin(storedAdmin);
    } else {
      setError("Không tìm thấy thông tin người dùng");
    }
  }, []);

  /* ================= THỐNG KÊ ================= */
  const handleThongKe = async () => {
    if (!ngayBatDau || !ngayKetThuc) {
      setError("Vui lòng chọn đầy đủ ngày");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await axios.post(
        `${AppURL.ThongKe}/${admin.email}`,
        {
          // ⚠️ PHẢI dd/MM/yyyy
          ngaybatdau: format(ngayBatDau, "dd/MM/yyyy"),
          ngayketthuc: format(ngayKetThuc, "dd/MM/yyyy"),
        }
      );

      if (res.data?.status) {
        setData(res.data);
      } else {
        setError(res.data?.message || "Lỗi dữ liệu");
      }
    } catch (err) {
      setError("Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EXPORT EXCEL ================= */
  const handleExportExcel = async () => {
    if (!ngayBatDau || !ngayKetThuc) {
      setError("Vui lòng chọn ngày trước khi export");
      return;
    }

    try {
      const response = await axios.post(
        `${AppURL.ExportThongke}/${admin.email}`,
        {
          // ⚠️ PHẢI dd/MM/yyyy
          ngaybatdau: format(ngayBatDau, "dd/MM/yyyy"),
          ngayketthuc: format(ngayKetThuc, "dd/MM/yyyy"),
        },
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "thong_ke_diem_danh.xlsx";

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("Không thể export file Excel");
    }
  };

  return (
    <main className="main-wrapper">
      <div className="student-table-container">
        <div className="title-wrapper">
          <h3 className="chitietdiemdanh">
            Thống kê điểm danh theo ngày
          </h3>
        </div>

        <div className="filter-wrapper">
          <div className="filter-item">
            <label>Ngày bắt đầu</label>
            <DatePicker
              selected={ngayBatDau}
              onChange={setNgayBatDau}
              dateFormat="dd/MM/yyyy"
              placeholderText="Chọn ngày"
            />
          </div>

          <div className="filter-item">
            <label>Ngày kết thúc</label>
            <DatePicker
              selected={ngayKetThuc}
              onChange={setNgayKetThuc}
              dateFormat="dd/MM/yyyy"
              placeholderText="Chọn ngày"
            />
          </div>

          <button onClick={handleThongKe} disabled={loading}>
            {loading ? "Đang tải..." : "Thống kê"}
          </button>

          {data && (
            <button
              onClick={handleExportExcel}
              style={{
                marginLeft: 10,
                backgroundColor: "#1d6f42",
                color: "#fff",
              }}
            >
              Export Excel
            </button>
          )}
        </div>

        {error && <p className="error-text">{error}</p>}

        {data && (
          <table className="student-table">
            <thead>
              <tr>
                <th>Mã lịch thi</th>
                <th>Môn thi</th>
                <th>Ngày thi</th>
                <th>Giờ</th>
                <th>Phòng</th>
                <th>Tổng SV</th>
                <th>Có mặt</th>
                <th>Vắng</th>
                <th>% Có mặt</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((item, index) => {
                const tyle =
                  item.tong_sv > 0
                    ? (
                        (item.soluong_comat / item.tong_sv) *
                        100
                      ).toFixed(2)
                    : 0;

                return (
                  <tr key={index}>
                    <td>{item.malichthi}</td>
                    <td>{item.monthi}</td>
                    <td>{item.ngaythi}</td>
                    <td>
                      {item.giobatdau} - {item.gioketthuc}
                    </td>
                    <td>{item.phongthi}</td>
                    <td>{item.tong_sv}</td>
                    <td style={{ color: "green", fontWeight: "bold" }}>
                      {item.soluong_comat}
                    </td>
                    <td style={{ color: "red", fontWeight: "bold" }}>
                      {item.soluong_vang}
                    </td>
                    <td style={{ fontWeight: "bold" }}>{tyle}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
