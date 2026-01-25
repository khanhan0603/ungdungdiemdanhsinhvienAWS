import "./home.css";
import { Link } from "react-router-dom";

export default function HomeUS() {
  return (
    <div className="main-wrapper">
      <div className="home-container">

        {/* HERO */}
        <section className="hero-section">
          <div className="hero-overlay">
            <button
              className="hero-btn"
              onClick={() => window.open("https://stu.edu.vn", "_blank")}
            >
              Truy cập Trường Đại học Công nghệ Sài Gòn
            </button>
          </div>
        </section>

        {/* FEATURE */}
        <section className="feature-section">
          <div className="feature-card">
            <h3>👨‍🏫 Lịch thi</h3>
            <p>Quản lý ca thi, theo dõi điểm danh sinh viên.</p>
            <Link to="/lichthi">Xem thêm</Link>
          </div>
        </section>

      </div>
    </div>
  );
}
