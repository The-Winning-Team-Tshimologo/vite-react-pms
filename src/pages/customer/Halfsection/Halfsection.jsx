import React from 'react'
import './halfsection.css'
import download from '../../../assets/download.jpeg'
import download1 from '../../../assets/download1.jpeg'
import geyser3 from '../../../assets/geyser3.jpeg'



const Halfsection = () => {
  return (
    <div>

        <div className="box_border">
        <div className="box_content">
        <h1>Service Request Details</h1>
       </div>
       <div className="box_border_left"> 
       <div className="box_content_left">
        <h1>Title</h1>
        Plumber
       </div>
       </div>
        <div className="box_border_right">
        <div className="box_content_right">
        <h1>Appointed for </h1>
        20/60/36
       </div>


        </div>

        <div className="image_complaints">
          <h3>Service request images</h3>
          <div className="image_row">
          <img src={download} alt="download" />  
          <img src={download1} alt="download" /> 
          <img src={geyser3} alt="download" /> 
          
           
          </div>
          <button className="button_right" style={{ color: 'white' }}>Accept Request</button>
        </div>
      </div>
    </div>
  );
};

export default Halfsection;