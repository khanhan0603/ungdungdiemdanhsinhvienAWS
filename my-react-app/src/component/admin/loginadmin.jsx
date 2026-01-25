import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FooterLogin from "../loginfooter";
import { login } from "../../services/authServicead";
import { jwtDecode } from "jwt-decode";


export default function Loginadmin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessages([]);
    setLoading(true);

    const errors = [];
    if (!email) errors.push("Vui lòng nhập email.");
    if (!password) errors.push("Vui lòng nhập mật khẩu.");

    if (errors.length > 0) {
      setErrorMessages(errors);
      setLoading(false);
      return;
    }

    try {
      const res = await login({ email, password });

      console.log("Kết quả login:", res);

      // Kiểm tra token của Laravel JWT
      if (!res || !res.access_token) {
        setErrorMessages(["Server không trả về access_token!"]);
        return;
      }

      // Lưu token
      localStorage.setItem("token", res.access_token);
      localStorage.setItem("admin", JSON.stringify(res.admin));
      navigate("/homepage");
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);

      if (err.response?.data?.errors) {
        const serverErrors = Object.values(err.response.data.errors).flat();
        setErrorMessages(serverErrors);
      } else if (err.response?.data?.error) {
        setErrorMessages([err.response.data.error]);
      } else {
        setErrorMessages(["Sai tên đăng nhập hoặc mật khẩu!"]);
      }
    } finally {
      setLoading(false);
    }
  };

  
  
useEffect(() => {
  const token = localStorage.getItem("access_token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);
    } catch (err) {
      console.error("JWT decode lỗi:", err);
    }
  }
}, []);
  return (
    <div id="landing-all">
      <div id="login-admin">
        <h5>ADMIN LOGIN</h5>

        <form onSubmit={handleLogin}>
          <table style={{ margin: "0 auto" }}>
            <tbody>
              <tr>
                <td>Email</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="email"
                    style={{ width: "400px" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td>Password</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="password"
                    style={{ width: "400px" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </td>
              </tr>

              {errorMessages.length > 0 && (
                <tr>
                  <td style={{ color: "red", paddingTop: "8px" }}>
                    <ul style={{ paddingLeft: "15px", margin: 0 }}>
                      {errorMessages.map((msg, idx) => (
                        <li key={idx}>{msg}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}

              <tr>
                <td style={{ paddingBottom: "10px" }}>
                  <Link
                    to="/formqmk"
                    style={{ color: "#ff5722", textDecoration: "none" }}
                  >
                    Forgot my password
                  </Link>
                </td>
              </tr>

              <tr>
                <td style={{ textAlign: "center", paddingTop: "10px" }}>
                  <button
                    type="submit"
                    style={{
                      background: "#007bff",
                      color: "#fff",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>

      <FooterLogin />
    </div>
  );
}
