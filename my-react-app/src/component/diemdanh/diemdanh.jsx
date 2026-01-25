import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppURL from "../../api/AppURL";
import { FaCameraRetro, FaSyncAlt } from "react-icons/fa";
import "./diemdanh.css";

export default function DiemDanh() {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const { madiemdanh } = useParams();

  const [image, setImage] = useState(null);
  const [uploadResultMessage, setUploadResultMessage] = useState("");
  const [matchedStudents, setMatchedStudents] = useState([]);
  const [isAuth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  // 👇 camera trước / sau
  const [facingMode, setFacingMode] = useState("user"); // user | environment

  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.access_token;

  // =========================
  //  CHECK LOGIN
  // =========================
  useEffect(() => {
    if (!token) {
      toast.error("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.");
      navigate("/loginuser");
    }
  }, [token, navigate]);

  // =========================
  //  VIDEO CONSTRAINTS
  // =========================
  const videoConstraints = {
    width: 500,
    height: 350,
    facingMode, // 👈 camera trước / sau
  };

  // =========================
  //  CHỤP + UPLOAD + AUTH + LƯU
  // =========================
  const captureAndAuthenticate = async () => {
    if (!webcamRef.current) {
      toast.error("Không tìm thấy webcam!");
      return;
    }

    const screenshot = webcamRef.current.getScreenshot();
    if (!screenshot) {
      toast.error("Không thể chụp ảnh từ webcam!");
      return;
    }

    setLoading(true);
    setMatchedStudents([]);
    setUploadResultMessage("Đang xử lý ảnh...");

    try {
      const byteString = atob(screenshot.split(",")[1]);
      const mimeString = screenshot.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
      const blob = new Blob([ab], { type: mimeString });
      setImage(blob);

      const imageName = uuidv4();
      const uploadUrl = `https://cfv8baqwua.execute-api.ap-southeast-2.amazonaws.com/dev/stu-visitor-image-storage/${imageName}.jpeg`;

      setUploadResultMessage("Đang tải ảnh lên server...");
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": "image/jpeg" },
        body: blob,
      });

      if (!uploadResponse.ok) throw new Error("Upload thất bại");

      setUploadResultMessage("Đang nhận diện khuôn mặt...");
      const response = await authenticate(imageName);

      if (response.Message === "Success" && response.matchedStudents?.length > 0) {
        setAuth(true);
        setMatchedStudents(response.matchedStudents);

        let successCount = 0;
        for (const sv of response.matchedStudents) {
          const ok = await saveCTDiemDanh(sv.studentId);
          if (ok) successCount++;
        }

        setUploadResultMessage(
          `✅ Nhận diện ${response.matchedStudents.length} sinh viên – Thành công ${successCount}`
        );
      } else {
        setAuth(false);
        setUploadResultMessage("❌ Không tìm thấy sinh viên trùng khớp.");
      }
    } catch (err) {
      console.error(err);
      setUploadResultMessage("❌ Lỗi xử lý điểm danh.");
      toast.error("Lỗi xử lý điểm danh!");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  //  API NHẬN DIỆN
  // =========================
  const authenticate = async (name) => {
    const url =
      "https://cfv8baqwua.execute-api.ap-southeast-2.amazonaws.com/dev/student?" +
      new URLSearchParams({ objectKey: `${name}.jpeg` });

    const res = await fetch(url);
    if (!res.ok) throw new Error("API nhận diện lỗi");
    return await res.json();
  };

  // =========================
  //  LƯU CHI TIẾT ĐIỂM DANH
  // =========================
  const saveCTDiemDanh = async (masv) => {
    try {
      const response = await fetch(AppURL.LuuCTDD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ madiemdanh, masv, tinhtrang: 1 }),
      });

      if (response.status === 201) return true;
      if (response.status === 409) {
        toast.warning(`${masv} đã điểm danh`);
        return false;
      }
      return false;
    } catch {
      toast.error("Lỗi lưu điểm danh");
      return false;
    }
  };

  // =========================
  //  KẾT THÚC
  // =========================
  const finishDiemDanhHandler = async () => {
    try {
      const res = await fetch(
        "https://be.luongminhkhanhan.io.vn/api/ketthucdiemdanh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ madiemdanh }),
        }
      );
      const json = await res.json();
      if (json.status) navigate(`/kthucdiemdanh/${userData.email || ""}`);
    } catch {
      toast.error("Lỗi kết thúc điểm danh");
    }
  };

  // =========================
  //  UI
  // =========================
  return (
    <div className="app-diemdanh">
      <h2>Điểm danh sinh viên</h2>

      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="webcam-frame"
      />

      {/* 🔄 Đổi camera */}
      <button
        className="switch-camera"
        onClick={() =>
          setFacingMode((prev) =>
            prev === "user" ? "environment" : "user"
          )
        }
      >
        <FaSyncAlt /> Đổi camera
      </button>

      <button
        className="authenticate"
        onClick={captureAndAuthenticate}
        disabled={loading}
      >
        <FaCameraRetro /> {loading ? "Đang xử lý..." : "Chụp & Xác thực"}
      </button>

      {matchedStudents.length > 0 && (
        <div className="matched-list">
          <h4>Sinh viên nhận diện:</h4>
          <ul>
            {matchedStudents.map((sv) => (
              <li key={sv.studentId}>
                MSSV <b>{sv.studentId}</b> – {sv.similarity.toFixed(1)}%
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={isAuth ? "success" : "failure"}>
        {uploadResultMessage || "\u00A0"}
      </div>

      <div className="action-buttons">
        <button onClick={() => navigate("/lichthi")}>Thoát</button>
        <button
          onClick={finishDiemDanhHandler}
          style={{ background: "red", color: "#fff" }}
        >
          Kết thúc điểm danh
        </button>
      </div>
    </div>
  );
}
