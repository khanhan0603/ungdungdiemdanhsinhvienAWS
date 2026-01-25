
import { useNavigate } from "react-router-dom";

export default function FooterLogin() {
  const navigate = useNavigate(); 

  const goToUserLogin = () => {
    navigate("/loginuser");
  };

  const goToAdminLogin = () => {
    navigate("/");
  };

  return (
    <div id="landing-footer">
      <div
      >
        <button
          id="user-login-btn"
          onClick={goToUserLogin}
        >
          User
        </button>
      
        <button
          id="admin-login-btn"
          onClick={goToAdminLogin}
        >
          Admin
        </button>
      </div>
    </div>
  );
}


