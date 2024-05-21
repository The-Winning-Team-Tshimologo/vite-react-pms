import React from 'react';
import uploadIcon from '../../assets/upload-icon.png'; // adjust the path as needed

const FileUpload = ({onClick}) => {

    

  return (
    <div className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-teal-500 w-fit rounded-lg text-black" onClick={onClick}>
      <div className="flex items-center justify-center p-2 rounded-full ">
        <img src={uploadIcon} alt="Upload" className="h-12" />
      </div>
      <p className="mt-2 text-sm">Drag & drop files or <span className="text-teal-500 underline">Browse</span></p>
      <p className="mt-2 text-xs">
        Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
      </p>
    </div>
  );
};

export default FileUpload;
