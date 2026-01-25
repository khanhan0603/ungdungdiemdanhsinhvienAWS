import axios from "axios";

const API_URL = "https://be.luongminhkhanhan.io.vn/api";

export const luuDiemDanh = async (malichthi) => {
  try {
    const response = await axios.post(`${API_URL}/luudiemdanh`, {
      malichthi: malichthi,
    });

    return response.data; // trả về JSON từ Laravel
  } catch (error) {
    console.error("Lỗi lưu điểm danh:", error);
    throw error;
  }
};
