import React from 'react';
import Sidebar from '../sidebar/Sidebar'
import heroImage from "../../assets/cover.jpg"
import './Profile.css'; 


function Profile(){

    return(
        
        <>
        < div className='header'>
      <Sidebar />
<div class="profile">
<img src={heroImage} alt="" className="round-image" />
            <span>Connie Ferg</span>
        </div>
     <div class="menu-dots">
    <div class="menu-dot"></div>
    <div class="menu-dot"></div>
    <div class="menu-dot"></div>
</div>     
</div>

< div className='section'>
<div className="hero">
            <img src={heroImage} alt="" className="round-image" />
            <div class="details">
                <div class="name">Sibusiso Mabaso</div>
                <div class="professional">Plumber</div>
                <div class="location">Johannesburg, Gauteng</div>
            </div>  
      </div> 
      <div className='content'>
            <h2>Professional Summary</h2>
            <p>Efficient plumber with 7+ years of experience. Skilled in PEX and copper installation, repair, and maintenance.
                 Seeking to deliver high-quality work for Benny Sondergeld Services. At Dickinson Elwood, 
                 completed work 20% faster than company average, with 95% customer satisfaction ratings and 10% less errors.
                  Volunteered to work on call 365 days a year.</p>
            <h2>Work Experience</h2>
            <p>Plumber Dickinson Elwood Plumbing May 2013–May 2019 Worked in a high-volume plumbing business,
                 completing 10–30 client calls per week. Installed new plumbing systems on 20+ $1M–$3M homes</p>
            <p>Plumber Jim’s Rooter of Lexington April 2012–June 2013 Answered 50+ customer calls per week. 
                Maintained upsell rate 15% higher than franchise average.</p>
            <h2>Education</h2>
            <p>2012–2012 Ivy Tech Community College of Lexington Vocational Training and Apprenticeship 
                Commended 6x by the contractor I apprenticed with for efficiency. Excelled in new installation instruction.</p>
            <h2>License</h2>
            <p>Journeyman License #8823473, Kentucky Division of Plumbing</p>
            <h2>Skills</h2>
            <p>Technical Skills: Installation, repair, PEX, copper, sewage lines, PVC, venting
               Soft Skills: Physical fitness, problem solving, strong work ethic, customer service</p>

            <div className='button'>
              <button className="primary-btn">revoke</button>
            </div>
          </div>
     
      
</div>





        </>





    );

}
export default Profile