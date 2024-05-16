import React from 'react';
import uploadIcon from '../../assets/upload-icon.png'; // adjust the path as needed
import { useDropzone } from "react-dropzone";
const FileUpload =  ({
  handleFileChange,
  onDrop,
  inputName,
  formData,
  errors,
  labelName,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleFileChange(acceptedFiles),
  });

  return (
    <div className="file-upload-container">
      <label>
        {labelName} {errors && <span className="error-message">{errors}</span>}
      </label>
      <div
        className="file-upload-box"
        {...getRootProps()}
        // style={{
        //   borderColor: isDragActive ? "#888" : "#5E8D83",
        //   backgroundColor: isDragAccept ? "#f0f8ff" : "#f8fafc",
        // }}
      >
        <div className="flex items-center justify-center p-2 rounded-full h-10 ">
          <img src={uploadIcon} alt="Upload" className="h-12" />
        </div>
        <p>
          Drag & drop files or{" "}
          <label htmlFor={`file-upload-${inputName}`} className="browse-label">
            Browse
          </label>
        </p>
        <p style={{ fontSize: "12px" }}>Supported formats: JPEG, PNG, PDF</p>
        <input
          {...getInputProps()}
          id={`file-upload-${inputName}`}
          name={inputName}
          onChange={(e) => handleFileChange(e)} // make sure this matches your handleFileChange setup
          style={{ display: "none" }}
          multiple 
        />
      </div>
      {formData && (
        <div className="file-feedback">
          <p>
            File selected:{" "}
            <span style={{ color: "blue" }}> {formData.name}</span>
          </p>
        </div>
      )}
    </div>
  );
};

    

//   return (
//     <div className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-teal-500 w-fit rounded-lg text-black" onClick={onClick}>
//       <div className="flex items-center justify-center p-2 rounded-full ">
//         <img src={uploadIcon} alt="Upload" className="h-12" />
//       </div>
//       <p className="mt-2 text-sm">Drag & drop files or <span className="text-teal-500 underline">Browse</span></p>
//       <p className="mt-2 text-xs">
//         Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
//       </p>
//     </div>
//   );
// };


export default FileUpload;
