// services/phanCongService.js
import axiosInstance from "../config/axiosInstance";

 const getPhanCongGV = async (email) => {
  try {
    const response = await axiosInstance.get(`/phanconggv/${email}`);
    return response.data ?? { status: false, data: [] }; 
  } catch (error) {
    console.error("Lỗi lấy phân công giảng viên:", error);
    return { status: false, data: [] };
  }
};
export { getPhanCongGV};