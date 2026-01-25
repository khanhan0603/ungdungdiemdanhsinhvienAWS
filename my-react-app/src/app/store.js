import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "../features/adminSlice";
import userSlice from "../features/userSlice";

export const store = configureStore({
  reducer: {
    admin: adminSlice, // Quản lý thông tin admin
    user: userSlice,   // Quản lý thông tin giảng viên
  },
});
