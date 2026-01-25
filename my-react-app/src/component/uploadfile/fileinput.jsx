
import { FaFileImport } from "react-icons/fa6";

const FileInput=({onFileSelect})=>{
    const handleFileChange=(e)=>{
        const file=e.target.files[0];
       onFileSelect(file);
    };
    return (
    <div style={{ marginTop: "10px" }}>
      <label className="custom-file-upload">
        <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
        <FaFileImport /> Import dữ liệu
      </label>
    
    </div>
  );

}
export default FileInput;