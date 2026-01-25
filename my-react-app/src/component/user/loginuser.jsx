import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FooterLogin from "../loginfooter";
import { login } from "../../services/authService";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export default function LoginUser() {
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

      if (!res || !res.access_token) {
        setErrorMessages(["Server không trả về access_token!"]);
        setLoading(false);
        return;
      }


      const loginData = {
        access_token: res.access_token,  
        token_type: res.token_type || "bearer",
        expires_in: res.expires_in || 3600,
        ...res.user  
      };

  
      localStorage.setItem("user", JSON.stringify(loginData));

      
      localStorage.setItem("token", res.access_token);

  
      const decoded = jwtDecode(res.access_token);
      console.log("Dữ liệu trong access_token:", decoded);

      toast.success("Đăng nhập thành công!"); 
      navigate("/homeuser");
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

  return (
    <>
      <div id="landing-all">
        <div id="login-user">
          <h5>USER LOGIN</h5>

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
                      to="/quenmatkhau"
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
    </>
  );
}