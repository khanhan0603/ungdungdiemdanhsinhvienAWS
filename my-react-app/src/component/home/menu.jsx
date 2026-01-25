import { FaTachometerAlt, FaShoppingCart, FaChalkboardTeacher, FaFileAlt, FaUser, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function Menu({isOpen}) {
    const admin = JSON.parse(localStorage.getItem("admin"));
    const email = admin?.email || null;
  return (
  <>
    <nav className={`sidebar-menu ${isOpen ? "active":""}`}>
      <ul>
        <li>
          <Link to="/homepage" style={{textDecoration:"none",color:"#0E4274"}}>
            <FaTachometerAlt /><span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/dssv" style={{textDecoration:"none",color:"#0E4274"}}>
            <FaShoppingCart /><span>Danh Sách SV</span>
          </Link>
        </li>
        <li>
          <Link to="/dsgv" style={{textDecoration:"none",color:"#0E4274"}}>
            <FaChalkboardTeacher /><span>Giảng Viên</span>
          </Link>
        </li>
        <li>
          <Link to="/dslichthi" style={{textDecoration:"none",color:"#0E4274"}}>
            <FaFileAlt /><span>Phân Công Lịch Thi</span>
          </Link>
        </li>
         <li>
          <Link to={`/thongke/${email}`} style={{textDecoration:"none",color:"#0E4274"}}>
            <FaFileAlt /><span>Thống kê</span>
          </Link>
        </li>
        <li>
          <Link to="/accountad" style={{textDecoration:"none", color:"#0E4274"}}>
            <FaUser /><span>Account</span>
          
          </Link>
        </li>
        <li>
          <Link to="/uploadimages" style={{textDecoration:"none",color:"#0E4274"}}>
            <FaCog /><span>Upload hình ảnh</span>
          </Link>
        </li>
      </ul>
    </nav>
     </>
  );
}
