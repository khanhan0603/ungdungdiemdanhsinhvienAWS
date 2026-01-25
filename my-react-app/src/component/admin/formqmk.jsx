import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import AppURL from "../../api/AppURL";

export default function FormQMK() {

const [email,setEmail]=useState("");
const [loading,setLoading]=useState(false);
const navigate=useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post(AppURL.SendResetPWAdmin, { email });

    toast.success(res.data.message || "Mã xác nhận đã được gửi");

    navigate(`/formmacode?email=${btoa(email)}`);
  } catch (err) {
    if (err.response?.status === 404) {
      toast.error(err.response.data.message); 
    } else {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  } finally {
    setLoading(false);
  }
};
  
  return (
    <header>
      <form id="forgot_password" onSubmit={handleSubmit}>
        <h1>Quên mật khẩu</h1>
        <table>
          <tbody>
            <tr>
              <td>Nhập email của bạn:</td>
            </tr>
            <tr>
              <td>
                <input
                  type="email"
                  id="emailmypassword"
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 required
                />
              
              </td>
            </tr>

            <tr>
              <td className="btn-right">
                <button type="submit" id="send-email-btn" disabled={loading}>
                  {loading ? "Đang gửi..." : "Tiếp tục"}
                </button>
              </td>
            </tr>
            <tr>
              <td className="link-center">
                <Link to="/" id="back-to-login">
                  Quay lại đăng nhập?
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </header>
  );
}