import { useEffect, useMemo, useState } from "react";
import AppURL from "../../api/AppURL";
import { toast } from "react-toastify";
import "./uploadImage.css";

export default function UploadImage() {
  const [sinhviens, setSV] = useState([]);
  const [nganhs, setNganhs] = useState([]);
  const [lops, setLops] = useState([]);

  const [selectedNganh, setSelectedNganh] = useState("Tất cả");
  const [selectedLop, setSelectedLop] = useState("Tất cả");

  const [selectedFiles, setSelectedFiles] = useState({});
  const [selectedSVs, setSelectedSVs] = useState([]);
  const [presignedUrls, setPresignedUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */
  const fetchSV = async () => {
    setLoading(true);
    try {
      const res = await fetch(AppURL.ListsvWithImage);
      const data = await res.json();
      setSV(data || []);
    } catch {
      toast.error("Không thể tải danh sách sinh viên!");
    } finally {
      setLoading(false);
    }
  };

  const fetchNganh = async () => {
    const res = await fetch(AppURL.Listnganh);
    setNganhs(await res.json());
  };

  const fetchLop = async () => {
    const res = await fetch(AppURL.Listlop);
    setLops(await res.json());
  };

  useEffect(() => {
    fetchSV();
    fetchNganh();
    fetchLop();
  }, []);

  /* ================= FILTER ================= */
  const filteredSVs = useMemo(() => {
    return sinhviens.filter((sv) => {
      const matchNganh =
        selectedNganh === "Tất cả" ||
        String(sv.manganh) === String(selectedNganh);

      const matchLop =
        selectedLop === "Tất cả" ||
        String(sv.malop) === String(selectedLop);

      return matchNganh && matchLop;
    });
  }, [sinhviens, selectedNganh, selectedLop]);

  /* Reset selection khi đổi filter */
  useEffect(() => {
    setSelectedSVs([]);
    setSelectedFiles({});
  }, [selectedNganh, selectedLop]);

  /* ================= SELECT ================= */
  const toggleSelect = (masv) => {
    setSelectedSVs((prev) =>
      prev.includes(masv) ? prev.filter((id) => id !== masv) : [...prev, masv]
    );
  };

  const toggleSelectAll = () => {
    const list = filteredSVs
      .filter((sv) => !sv.hasImage)
      .map((sv) => sv.masv);

    setSelectedSVs(
      selectedSVs.length === list.length ? [] : list
    );
  };

  /* ================= UPLOAD ================= */
  const getPresignedUrls = async () => {
    if (!selectedSVs.length) return toast.warning("Chưa chọn sinh viên!");

    const res = await fetch(AppURL.getMultiUploadUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ students: selectedSVs }),
    });

    setPresignedUrls(await res.json());
    toast.success("Đã lấy presigned URL");
  };

  const handleFileChange = (masv, e) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [masv]: e.target.files[0],
    }));
  };

  const handleUploadFiles = async () => {
    if (!presignedUrls.length) return;

    await Promise.all(
      presignedUrls.map((item) => {
        const file = selectedFiles[item.studentId];
        if (!file) return;
        return fetch(item.uploadUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type || "image/jpeg" },
          body: file,
        });
      })
    );

    toast.success("Upload thành công!");
    fetchSV();
    setSelectedSVs([]);
    setSelectedFiles({});
    setPresignedUrls([]);
  };

  /* ================= RENDER ================= */
  return (
    <main className="main-wrapper">
      <div className="upload-control-panel">
        <div className="upload-filters">
          <div className="filter-item">
            <label>Ngành</label>
            <select
              value={selectedNganh}
              onChange={(e) => {
                setSelectedNganh(e.target.value);
                setSelectedLop("Tất cả");
              }}
            >
              <option value="Tất cả">Tất cả</option>
              {nganhs.map((n) => (
                <option key={n.manganh} value={n.manganh}>
                  {n.tennganh}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>Lớp</label>
            <select
              value={selectedLop}
              onChange={(e) => setSelectedLop(e.target.value)}
            >
              <option value="Tất cả">Tất cả</option>
              {lops
                .filter(
                  (l) =>
                    selectedNganh === "Tất cả" ||
                    String(l.manganh) === String(selectedNganh)
                )
                .map((l) => (
                  <option key={l.malop} value={l.malop}>
                    {l.malop}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="upload-actions">
          <button className="action-btn select-all" onClick={toggleSelectAll}>
            Chọn SV chưa có ảnh
          </button>
          <button className="action-btn get-url" onClick={getPresignedUrls}>
            Lấy URL
          </button>
          <button className="action-btn upload" onClick={handleUploadFiles}>
            Upload
          </button>
        </div>
      </div>

      <div className="upload-table-container">
        {loading ? (
          <div className="loading-message">Đang tải...</div>
        ) : (
          <table className="upload-student-table">
            <thead>
              <tr>
                <th>Chọn</th>
                <th>MSSV</th>
                <th>Họ tên</th>
                <th>Ngành</th>
                <th>Lớp</th>
                <th>Ảnh</th>
                <th>File</th>
              </tr>
            </thead>
            <tbody>
              {filteredSVs.map((sv) => (
                <tr key={sv.masv}>
                  <td>
                    {!sv.hasImage && (
                      <input
                        type="checkbox"
                        checked={selectedSVs.includes(sv.masv)}
                        onChange={() => toggleSelect(sv.masv)}
                      />
                    )}
                  </td>
                  <td>{sv.masv}</td>
                  <td>{sv.hoten}</td>
                  <td>{sv.manganh}</td>
                  <td>{sv.malop}</td>
                  <td>{sv.hasImage ? "Đã có" : "Chưa có"}</td>
                  <td>
                    {selectedSVs.includes(sv.masv) && !sv.hasImage && (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(sv.masv, e)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
