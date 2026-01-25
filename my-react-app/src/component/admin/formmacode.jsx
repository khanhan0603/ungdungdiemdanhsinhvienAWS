import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import AppURL from "../../api/AppURL";

export default function FormNhapCode() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const encodedEmail = searchParams.get("email");
  const email = encodedEmail ? atob(encodedEmail) : "";

 
  useEffect(() => {
    if (!encodedEmail || !email) {
      toast.error("Dữ liệu không hợp lệ, vui lòng nhập lại email");
      navigate("/formqmk");
    }
  }, [encodedEmail, email, navigate]);

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    if (code.length !== 6) {
      toast.error("Mã xác nhận phải đủ 6 số");
      return;
    }

    setLoading(true);

    try {
      await axios.post(AppURL.VerifyRSCodeAD, {
        email,
        code,
      });

      toast.success("Xác minh mã thành công");

      navigate(`/formdmk?email=${btoa(email)}&code=${code}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Mã xác nhận không đúng!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header>
      <form id="form_nhap_code" onSubmit={handleVerifyCode}>
        <h1>Xác minh mã bảo mật</h1>

        <table>
          <tbody>
            <tr>
              <td>Nhập mã xác nhận được gửi đến email của bạn:</td>
            </tr>

            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Nhập mã 6 số"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                  required
                />
              </td>
            </tr>

            <tr>
              <td className="btn-right">
                <button type="submit" disabled={loading}>
                  {loading ? "Đang xác minh..." : "Tiếp tục"}
                </button>
              </td>
            </tr>

            <tr>
              <td className="link-center">
                <Link to="/formqmk">Quay lại nhập email?</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </header>
  );
}
