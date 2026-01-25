import { useState, useRef ,useEffect} from "react";
import Webcam from "react-webcam";
import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppURL from "../../api/AppURL";
import { FaCameraRetro } from "react-icons/fa";

export default function DiemDanh() {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const { madiemdanh } = useParams();

  const [image, setImage] = useState(null);
  const [uploadResultMessage, setUploadResultMessage] = useState("");
  const [isAuth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
 const userData = JSON.parse(localStorage.getItem("user") || "{}");
const token = userData?.access_token; 

useEffect(() => {
  if (!token) {
    toast.error("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại.");
    navigate("/loginuser");
  }
}, [token, navigate]);
  // =========================
  //  CHỤP + AUTH + LƯU
  // =========================
  const captureAndAuthenticate = async () => {
    if (!webcamRef.current) {
      toast.error("Không tìm thấy webcam!");
      return;
    }

    const screenshot = webcamRef.current.getScreenshot();
    if (!screenshot) {
      toast.error("Không thể chụp ảnh!");
      return;
    }

    setLoading(true);

    try {
      // Convert base64 → Blob
      const byteString = atob(screenshot.split(",")[1]);
      const mimeString = screenshot.split(",")[0].split(":")[1].split(";")[0];

      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });
      setImage(blob);

      const visitorImageName = uuidv4();

      await fetch(
        `https://cfv8baqwua.execute-api.ap-southeast-2.amazonaws.com/dev/stu-visitor-image-storage/${visitorImageName}.jpeg`,
        {
          method: "PUT",
          headers: { "Content-Type": "image/jpeg" },
          body: blob,
        }
      );

      // Authenticate
      const response = await authenticate(visitorImageName);

      if (response.Message === "Success" && response.matchedStudents?.length > 0) {
        const student = response.matchedStudents[0];
        const masv = student.studentId;
        const similarity = student.similarity;

        setAuth(true);
        setUploadResultMessage(
          ` MSSV: ${masv} — Độ giống: ${similarity.toFixed(2)}%`
        );
        toast.success(`Điểm danh sinh viên: ${masv}`);

        await saveCTDiemDanh(masv);
      } else {
        setAuth(false);
        setUploadResultMessage(" Không tìm thấy sinh viên trùng khớp!");
        toast.error("Không tìm thấy sinh viên trùng khớp!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi xử lý điểm danh!");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  //  API NHẬN DIỆN AWS
  // =========================
  const authenticate = async (name) => {
    const url =
      "https://cfv8baqwua.execute-api.ap-southeast-2.amazonaws.com/dev/student?" +
      new URLSearchParams({ objectKey: `${name}.jpeg` });

    try {
      const res = await fetch(url);
      return await res.json();
    } catch (err) {
      console.error(err);
      return { Message: "fail" };
    }
  };

  // =========================
  //  LƯU ĐIỂM DANH
  // =========================


const saveCTDiemDanh = async (masv) => {
  try {
    const response = await fetch(AppURL.LuuCTDD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        madiemdanh,
        masv,
        tinhtrang: 1,
      }),
    });

    const json = await response.json().catch(() => ({}));

    console.log("Response từ /luuctdiemdanh:", response.status, json); 

  
    if (response.status === 201 || (response.ok && json.status)) {
      setUploadResultMessage(`✔️ Điểm danh thành công: ${masv}`);
      toast.success(`Điểm danh thành công: ${masv}`);
      return;
    }

    if (response.status === 409) {
      setUploadResultMessage(" Sinh viên này đã điểm danh rồi!");
      toast.warning("Sinh viên này đã điểm danh rồi!");
      return;
    }

    if (response.status === 403) {
     
      setUploadResultMessage(" Sinh viên không thuộc lớp của buổi thi này!");
      toast.error("Sinh viên không thuộc lớp của buổi thi này!");
      return;
    }

    if (response.status === 404) {
      toast.error("Không tìm thấy buổi điểm danh!");
      return;
    }

    if (response.status === 401) {
      
      toast.error("Phiên đăng nhập hết hạn!");
      localStorage.removeItem("user");
      navigate("/loginuser");
      return;
    }


    toast.error(json.message || "Lưu điểm danh thất bại!");
    setUploadResultMessage(` Lỗi: ${json.message || "Unknown"}`);

  } catch (error) {
    console.error("Lỗi mạng khi lưu điểm danh:", error);
    toast.error("Lỗi kết nối server!");
  }
};

  // =========================
  //  KẾT THÚC ĐIỂM DANH
  // =========================
  const finishDiemDanhHandler = async () => {
  if (!madiemdanh) {
    toast.error("Mã điểm danh không hợp lệ!");
    return;
  }

  try {
    const response = await fetch(
      "https://be.luongminhkhanhan.io.vn/api/ketthucdiemdanh",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ madiemdanh }),
      }
    );

    const json = await response.json();

    if (response.ok && json.status) {
      toast.success(`Kết thúc điểm danh thành công! Tổng số: ${json.soluong}`);

   
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.email) {
        navigate(`/kthucdiemdanh/${user.email}`);
      } else {
        navigate("/kthucdiemdanh");
      }

    } else {
      toast.error(json.message || "Không thể kết thúc điểm danh!");
    }
  } catch (error) {
    console.error(error);
    toast.error("Lỗi kết nối server!");
  }
};

  const exit=async()=>{
    navigate('/lichthi');
  }

  return (
    <div className="app-diemdanh">
      <h2>Điểm danh sinh viên</h2>

      <div className="webcam-preview-row">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={500}
          height={350}
          videoConstraints={{
            width: 500,
            height: 350,
            facingMode: "user",
          }}
          className="webcam-frame"
        />

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="captured"
            width={250}
            height={250}
            className="captured-image"
          />
        )}
      </div>


      <button
        className="authenticate"
        onClick={captureAndAuthenticate}
        disabled={loading}
      >
        <FaCameraRetro />{" "}
        {loading ? "Đang điểm danh..." : "Xác thực"}
      </button>

      <div className="upload-result">
        <div className={isAuth ? "success" : "failure"}>
          {uploadResultMessage}
        </div>
      </div>
        <div className="action-buttons">
          <button className="exit" onClick={exit}>Thoát</button>
      <button
        className="ketthucdiemdanh"
        onClick={finishDiemDanhHandler}
        style={{ marginTop: 20, background: "red", color: "#fff", padding: 8 }}
      >
        Kết thúc 
      </button>
      </div>
    </div>
  );
}
