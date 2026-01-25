import { useState } from "react";
import FileInput from "./fileinput";
import readExcel from "./readexcel";
import AppURL from "../../api/AppURL";
import axios from "axios";
import { toast } from "react-toastify";

export default function ImportExcel({ onImportSuccess }) {
  const [, setExcelData] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (file) => {
    if (!file) return;

    try {
      setUploading(true);

      // Đọc file excel (nếu cần validate trước)
      const data = await readExcel(file);
      setExcelData(data);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(AppURL.LTimport, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 30000, // tránh treo request
      });

      console.log("Phản hồi từ server:", res.data);

      if (res.data.status === true || res.data.success === true) {
        toast.success(res.data.message || "Import thành công!");

        if (typeof onImportSuccess === "function") {
          onImportSuccess();
        }
      } else {
        toast.error(res.data.error || "Import thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi xử lý file Excel:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Không thể kết nối đến server hoặc lỗi trong quá trình import."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <FileInput onFileSelect={handleFileSelect} />
      {uploading && (
        <p style={{ color: "blue", marginTop: 8 }}>
          Đang tải dữ liệu...
        </p>
      )}
    </>
  );
}
