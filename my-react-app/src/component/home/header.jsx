import { useState } from "react";
import { FaBars, FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import logo from "../../asset/images/logotruong.png";

export default function Header({ onToggleMenu }) {
  const [openMenu, setOpenMenu] = useState(false);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/loginuser";
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo STU" className="header-logo" />
         <FaBars className="menu-icon" onClick={onToggleMenu} />
      </div>

 

      <div className="header-center">
        <h1 className="header-title">STU UNIVERSITY</h1>
      </div>

      <div className="header-right">
        <div className="search-box">
          <input type="text" placeholder="Tìm kiếm..." />
          <FaSearch className="search-icon" />
        </div>

        <FaBell className="bell-icon" />

        <div className="user-wrapper">
          <FaUserCircle
            className="user-icon"
            onClick={() => setOpenMenu(!openMenu)}
          />
          {openMenu && (
            <div className={`user-logout ${openMenu ? "open" : ""}`}>
              <div className="logout-btn" onClick={handleLogout}>
                <BiLogOutCircle />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}