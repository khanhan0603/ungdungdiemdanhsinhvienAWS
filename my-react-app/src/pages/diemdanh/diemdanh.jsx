import { useState } from "react";
import LichThiGiangVien from "../../component/user/lichthi";
import LuuDiemDanh from "../../component/diemdanh/luudiemdanh";
import DiemDanh from "../../component/diemdanh/diemdanh";
import LuuChiTietDiemDanh from "../../component/diemdanh/luuCTDD";
import KetThucDiemDanh from "../../component/diemdanh/kthucdiemdanh";
import ChiTietDiemDanh from "../../component/diemdanh/chitietdiemdanh";

export default function DiemDanhSV() {
  // B1: Chọn lịch thi
  const [malichthi, setMaLichThi] = useState(null);

  // B2: Khi tạo phiên điểm danh
  const [madiemdanh, setMaDiemDanh] = useState(null);

  // B3: Dữ liệu sinh viên đã điểm danh
  const [sinhVienDD, setSinhVienDD] = useState([]);

  // B4: Mã sinh viên nhận diện thành công
  const [svDangDiemDanh, setSvDangDiemDanh] = useState(null);

  // Callback từ DiemDanh.jsx → truyền lên SV
  const handleSinhVienNhanDien = (sv) => {
    // sv = { masv, malichthi, similarity, ... }
    setSvDangDiemDanh(sv.masv);
  };

  // Sau khi lưu chi tiết
  const handleLuuThanhCong = (data) => {
    setSinhVienDD((prev) => [...prev, data]);
    setSvDangDiemDanh(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Hệ thống điểm danh khuôn mặt</h1>

      {/* B1 - Chưa chọn lịch thi */}
      {!malichthi && (
        <LichThiGiangVien onStartDiemDanh={setMaLichThi} />
      )}

      {/* B2 - Đã chọn lịch thi nhưng chưa tạo phiên */}
      {malichthi && !madiemdanh && (
        <LuuDiemDanh
          malichthi={malichthi}
          onDiemDanhCreated={setMaDiemDanh}
        />
      )}

      {/* B3 - Đang điểm danh */}
      {madiemdanh && (
        <>
          <h2>Điểm danh đang diễn ra</h2>

          {/* CAMERA */}
          <DiemDanh
            madiemdanh={madiemdanh}
            onDiemDanh={handleSinhVienNhanDien}
          />

          {/* Tự động lưu ngay khi có masv */}
          {svDangDiemDanh && (
            <LuuChiTietDiemDanh
              madiemdanh={madiemdanh}
              masv={svDangDiemDanh}
              onSaved={handleLuuThanhCong}
            />
          )}

          {/* Kết thúc */}
          <KetThucDiemDanh madiemdanh={madiemdanh} />

          {/* Chi tiết */}
          {sinhVienDD.length > 0 && (
            <ChiTietDiemDanh sinhVienDD={sinhVienDD} />
          )}
        </>
      )}
    </div>
  );
}
