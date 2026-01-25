import "./home.css";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="main-wrapper">
      <div className="home-container">

        {/* HERO */}
        <section className="hero-section">
          <div className="hero-overlay">
            <h1>
              Get your <span>Education</span> today
            </h1>
            <p>
              Ứng dụng điểm danh sinh viên trong ca thi
            </p>
          </div>
        </section>

        <section className="feature-section">
          
          <div className="feature-card">
            <h3>👨‍🏫 Our Teachers</h3>
            <p>Quản lý ca thi, theo dõi điểm danh sinh viên.</p>
            <Link to="/dsgv">Xem thêm </Link>
          </div>

          <div className="feature-card">
            <h3>🎓 Our Students</h3>
            <p>Tham gia ca thi và điểm danh nhanh chóng.</p>
            <Link to="/dssv">Xem thêm</Link>
          </div>

          <div className="feature-card highlight">
            <h3>🏫 STU University</h3>
            <p>Trường Đại học Công nghệ Sài Gòn</p>
            <a
              href="https://stu.edu.vn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Truy cập website
            </a>
          </div>

        </section>

      </div>
    </div>
  );
}
