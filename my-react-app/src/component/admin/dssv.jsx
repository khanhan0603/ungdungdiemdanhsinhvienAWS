import AppURL from "../../api/AppURL";
import { useState, useEffect } from "react";
import ExcelDisplay from "../uploadfile/import";
import { Link } from "react-router-dom";

export default function ListSV() {
  const [sinhviens, setSV] = useState([]);
  const [selectedNganh, setSelectedNganh] = useState("Tất cả");
  const [nganhs, setNganhs] = useState([]);
  const [lops,setLops]=useState([]);
 const [selectedLop, setSelectedLop] = useState("Tất cả");
 
  const fetchSV = () => {
    fetch(AppURL.Listsv)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Lỗi khi tải dữ liệu danh sách sinh viên");
        }
        return res.json();
      })
      .then((data) => setSV(data))
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    fetchSV();
  }, []);

  //Load danh sách ngành
  useEffect(() => {
    fetch(AppURL.Listnganh)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Lỗi khi tải dữ liệu ngành!");
        }
        return res.json();
      })
      .then((data) => setNganhs(data))
      .catch((err) => console.log(err));
  }, []);

  //Load danh sách lớp
  useEffect(()=>{
    fetch(AppURL.Listlop)
    .then((res)=>{
      if(!res.ok){
        throw new Error("Lỗi khi tải dữ liệu lớp!")
      }
      return res.json();
    })
    .then((data)=>setLops(data))
    .catch((err)=>console.log(err));
  },[]);

  //  xóa sinh viên
  const handleDelete = async (masv) => {
    const confirmDelete = window.confirm("Bạn có muốn xóa sinh viên này không?");
    if (!confirmDelete) return;

    try {
      const url = `${AppURL.SvDelete}/${masv}`;
      const res = await fetch(url, { method: "POST" });

      if (!res.ok) {
        const msg = `Lỗi khi xoá sinh viên! Mã lỗi: ${res.status}`;
        throw new Error(msg);
      }

      alert("Xóa thành công!");
      fetchSV(); 
    } catch (error) {
      console.error(error);
      alert(error.message || "Không thể xoá sinh viên!");
    }
  };
  //Lọc sinh viên theo lớp
  const handleFilterSVLop=(e)=>{
    const value=e.target.value;
    setSelectedLop(value);

    const malop = value === "Tất cả"?"all":value;
    if(value=="Tất cả"){
      fetchSV();
      return;
    }
    fetch(`${AppURL.FilterSVTheoLop}/${malop}`)
    .then(res=>{
      if(!res.ok)
        throw new Error ("Lỗi khi lọc sinh viên!");
      return res.json();
    })
    .then(data=>setSV(data))
    .catch(err=>console.log(err));
  }

  //Lọc sinh viên theo ngành 
  const handleFilterSVNganh=(e)=>{
    const value=e.target.value;
    setSelectedNganh(value);
    const manganh=value==="Tất cả"?"all":value;
    if(value=="Tất cả"){
      fetchSV();
      return;
    }
    fetch(`${AppURL.FilterSVTheoNganh}/${manganh}`)
    .then((res)=>{
      if(!res.ok)
        throw new Error("Lỗi khi lọc dữ liệu sinh viên")
      return res.json();
    })
    .then(data=>setSV(data))
    .catch(err=>console.log(err));
  }

  return (
    <main className="main-wrapper">
      <div className="main-function">
        <div className="main-left">
        <label htmlFor="nganhselected">Ngành:</label>
        <select
          id="nganhSelect"
          value={selectedNganh}
          onChange={handleFilterSVNganh}
        >
          <option value="Tất cả">Tất cả</option>
          {nganhs.map((nganh) => (
            <option key={nganh.manganh} value={nganh.manganh}>
              {nganh.tennganh}
            </option>
          ))}
        </select>

         <label htmlFor="lopselected">Lớp:</label>
        <select
          id="lopSelect"
          value={selectedLop}
          onChange={handleFilterSVLop}
        >
          <option value="Tất cả">Tất cả</option>
          {lops.map((lop) => (
            <option key={lop.malop} value={lop.malop}>
              {lop.malop}
            </option>
          ))}
        </select>
          </div>
      
           <ExcelDisplay onImportSuccess={fetchSV} />
          
           </div>
      <div className="student-table-container">
        <table className="student-table">
          <thead>
            <tr>
              <th>MSSV</th>
              <th>Họ và tên</th>
              <th>Giới tính</th>
              <th>Email</th>
              <th>Ngày sinh</th>
              <th>SĐT</th>
              <th>Lớp</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {sinhviens.map((sv) => (
              <tr key={sv.masv}>
                <td>{sv.masv}</td>
                <td>{sv.hoten}</td>
                <td>{sv.gioitinh}</td>
                <td>{sv.email}</td>
                <td>{sv.ngaysinh_format}</td>
                <td>{sv.sdt}</td>
                <td>{sv.malop}</td>
                <td className="btn-group-lt">
                  <Link className="btn-update-lt" to={`/updatesv/${sv.masv}`}>
                  Edit
                  </Link>

                  <button className="btn-delete"
                    onClick={() => handleDelete(sv.masv)}
                    style={{ marginLeft: 8 }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
