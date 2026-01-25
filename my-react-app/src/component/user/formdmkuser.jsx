import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppURL from "../../api/AppURL";

export default function FormDMK() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();


  const emailParam = searchParams.get("email");
  const code = searchParams.get("code");


  const email = emailParam ? atob(emailParam) : "";

  const handleResetPassword = async () => {
    console.log("HANDLE RESET PASSWORD");

    if (!email || !code) {
      toast.error("Link đặt lại mật khẩu không hợp lệ!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(AppURL.ResetPassword, {
        email,
        code,
        password,
        password_confirmation: confirmPassword,
      });

      console.log("RESET RESPONSE:", res.data);

      if (res.data?.status === false) {
        toast.error(res.data.message || "Đổi mật khẩu thất bại!");
        return;
      }

      toast.success("Đổi mật khẩu thành công!");
      setTimeout(() => {
        navigate("/loginuser"); 
      }, 1000);
    } catch (err) {
      console.log("RESET ERROR:", err.response || err);

      const errors = err.response?.data?.errors;
      if (errors) {
        Object.values(errors).flat().forEach((msg) => toast.error(msg));
      } else {
        toast.error(
          err.response?.data?.message || "Đổi mật khẩu thất bại!"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="landing-all">
      <ToastContainer position="top-right" autoClose={3000} />
      <div id="formdoinmatkhau">
        <h1>Đổi mật khẩu</h1>

        <table>
          <tbody>
            <tr>
              <td>Nhập mật khẩu mới:</td>
            </tr>
            <tr>
              <td>
                <input
                  type="password"
                  placeholder="Mật khẩu mới"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </td>
            </tr>

            <tr>
              <td>Xác nhận mật khẩu:</td>
            </tr>
            <tr>
              <td>
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="btn-group">
          <button
            id="btn_thoat"
            type="button"
            onClick={() => navigate("/loginuser")}
            disabled={loading}
          >
            Thoát
          </button>

          <button
            id="btn_dangnhap"
            type="button"
            onClick={handleResetPassword}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Xác nhận"}
          </button>
        </div>
      </div>
    </div>
  );
}
