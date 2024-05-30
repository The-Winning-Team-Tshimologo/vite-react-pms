import React from 'react'
import './CustomerProfileCard.css';
import Ellipse from '../../../assets/Ellipse24.png'
import Halfsection from '../Halfsection/Halfsection';

const CustomerProfileCard = () => {
  return (
    <div>

<div className="card_border_line">
  
  <div className="profile-pic">
    <img src={Ellipse} alt="Profile" />
  </div>
  <div className="content">
    <div className="Name_Surname">
      <h2>Fortunate Motsoeneng</h2>
    </div>
    <div className="location">
      <p>Johannesburg, Gauteng, 2001</p>
      <p>South Africa</p>
    </div>
  </div>
  <button className="submit_button">Submit</button>
</div>

       <Halfsection/> 
     
    </div>
   
  
  )
}

export default CustomerProfileCard