import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import AppURL from "../../api/AppURL";
import ImportExcel from "../uploadfile/importgv";

export default function ListGV() {
  const [giangviens, setGV] = useState([]);
  const [nganhs, setNganhs] = useState([]);
  const [selectedNganh, setSelectedNganh] = useState("Tất cả");
  const [loadingGV, setLoadingGV] = useState(true);
  const [loadingNganh, setLoadingNganh] = useState(true);

  const getToken = () => localStorage.getItem("token");

  /* ===================== LOAD DANH SÁCH GV ===================== */
  const fetchGV = async () => {
    setLoadingGV(true);
    try {
      const res = await fetch(AppURL.Listgv, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      const data = Array.isArray(json.data) ? json.data : [];
      setGV(data);
    } catch (err) {
      console.error("Lỗi tải giảng viên:", err);
      toast.error("Không thể tải danh sách giảng viên!");
      setGV([]);
    } finally {
      setLoadingGV(false);
    }
  };

  /* ===================== LOAD NGÀNH ===================== */
  const fetchNganh = async () => {
    setLoadingNganh(true);
    try {
      const res = await fetch(AppURL.Listnganh, {
        headers: { 
          Accept: "application/json",
          Authorization: `Bearer ${getToken()}`, 
        },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      // Xử lý chắc chắn
      let data = [];
      if (Array.isArray(json.data)) data = json.data;
      else if (Array.isArray(json)) data = json;

      setNganhs(data);
    } catch (err) {
      console.error("Lỗi tải ngành:", err);
      toast.error("Không thể tải danh sách ngành!");
      setNganhs([]);
    } finally {
      setLoadingNganh(false);
    }
  };

  /* ===================== FILTER GV THEO NGÀNH ===================== */
  const handleFilterGV = async (e) => {
    const value = e.target.value;
    setSelectedNganh(value);

    if (value === "Tất cả") {
      fetchGV();
      return;
    }

    try {
      const res = await fetch(`${AppURL.FilterGVTheoNganh}/${value}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      setGV(Array.isArray(json.data) ? json.data : []);
    } catch (err) {
      console.error("Lỗi lọc giảng viên:", err);
      toast.error("Không thể lọc giảng viên!");
      setGV([]);
    }
  };

  /* ===================== XÓA GIẢNG VIÊN ===================== */
  const handleDelete = async (magv) => {
    if (!window.confirm("Bạn có chắc muốn xóa giảng viên này?")) return;

    try {
      const res = await fetch(`${AppURL.GvDelete}/${magv}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      toast.success("Xóa giảng viên thành công!");
      fetchGV();
    } catch (err) {
      console.error("Lỗi xóa giảng viên:", err);
      toast.error("Không thể xóa giảng viên!");
    }
  };

  useEffect(() => {
    fetchGV();
    fetchNganh();
  }, []);

  return (
    <main className="main-wrapper">
      <div className="main-function">
        <div className="main-left">
         <label htmlFor="nganhselected">Ngành:</label>
        <select
          id="nganhSelect"
          value={selectedNganh}
          onChange={handleFilterGV}
        >
          <option value="Tất cả">Tất cả</option>
          {nganhs.map((nganh) => (
            <option key={nganh.manganh} value={nganh.manganh}>
              {nganh.tennganh}
            </option>
          ))}
        </select>
        
        </div>

        <ImportExcel onImportSuccess={fetchGV} />
      </div>

      <div className="student-table-container">
        {loadingGV ? (
          <div>Đang tải danh sách giảng viên...</div>
        ) : (
          <table className="student-table">
            <thead>
              <tr>
                <th>MSGV</th>
                <th>Họ và tên</th>
                <th>Email</th>
                <th>SĐT</th>
                <th>Mã ngành</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {giangviens.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                giangviens.map((gv) => (
                  <tr key={gv.magv}>
                    <td>{gv.magv}</td>
                    <td>{gv.hoten}</td>
                    <td>{gv.email}</td>
                    <td>{gv.sdt}</td>
                    <td>{gv.manganh}</td>
                    <td className="btn-group-lt">
                      <Link
                        className="btn-update-lt"
                        to={`/updategv/${gv.magv}`}
                      >
                        Edit
                      </Link>

                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(gv.magv)}
                        style={{ marginLeft: 8 }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
