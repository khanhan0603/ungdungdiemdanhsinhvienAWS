import { FaTachometerAlt, FaClipboardCheck, FaChalkboardTeacher, FaUser, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MenuUser({isOpen}) {
  const navigate = useNavigate();
  const user=JSON.parse(localStorage.getItem("user"));
  const email=user?.email||null;


  return (
    <nav className={`sidebar-menu ${isOpen ? "active":""}`}>
      <ul>
        <li onClick={() => navigate("/homeuser")} className="menu-item">
          <FaTachometerAlt />
          <span>Dashboard</span>
        </li>

        <li onClick={() => navigate("/lichthi")} className="menu-item">
          <FaClipboardCheck />
          <span>Điểm danh</span>
        </li>

        <li onClick={() => navigate(`/kthucdiemdanh/${email}`)} className="menu-item">
          <FaChalkboardTeacher />
          <span>Danh sách điểm danh</span>
        </li>      

        <li onClick={() => navigate("/account")} className="menu-item">
          <FaUser />
          <span>Account</span>
        </li>

        
      </ul>
    </nav>
  );
}
