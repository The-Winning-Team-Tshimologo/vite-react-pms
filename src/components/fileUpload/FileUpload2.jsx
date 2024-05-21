import React from 'react'
import { useDropzone } from "react-dropzone";
import uploadIcon from "../../assets/upload-icon.png";
const FileUpload2 = ({handleChange, onDrop, inputName,formData,errors,labelName}) => {
    const { getRootProps, getInputProps, isDragActive, isDragAccept } =
    useDropzone({ onDrop: onDrop(inputName) });
  return (
    <div className="file-upload-container">
              {/* <label>
                {labelName}{" "}
                {errors && (
                  <span className="error-message">{errors}</span>
                )}
              </label> */}
              <div
                className="file-upload-box"
                {...getRootProps()}
                style={{
                  borderColor: isDragActive ? "#888" : "#5E8D83",
                  backgroundColor: isDragAccept ? "#f0f8ff" : "#f8fafc",
                }}
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
                <p style={{ fontSize: "12px" }}>
                  Supported formats: JPEG, PNG, PDF
                </p>
                <input
                  type="file"
                  id={`file-upload-${inputName}`}
                  name={inputName}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </div>
              {formData && (
                <div className="file-feedback">
                  <p>File selected: <span style={{ color:"blue" }}  > {formData.name}</span></p>
                </div>
              )}
            </div>
  )
}

export default FileUpload2