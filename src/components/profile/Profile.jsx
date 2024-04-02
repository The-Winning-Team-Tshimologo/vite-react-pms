import React from "react";
import Sidebar from "../sidebar/Sidebar";
import mockData from "../mockdata/mockdata";
import heroImage from "../../assets/cover.jpg"
import './Profile.css'


const Profile = () => {
  return (
    <>
      <div className='header'>
        <Sidebar />
        <div className="profile">
          <img src={heroImage} alt="" className="round-image" />
          <span>{mockData.profile.name}</span>
        </div>
        <div className="menu-dots">
          <div className="menu-dot"></div>
          <div className="menu-dot"></div>
          <div className="menu-dot"></div>
        </div>
      </div>

      <div className='section'>
        <div className="hero">
          <img src={heroImage} alt="" className="round-image" />
          <div className="details">
            <div className="name">{mockData.hero.name}</div>
            <div className="professional">{mockData.hero.profession}</div>
            <div className="location">{mockData.hero.location}</div>
          </div>
        </div>
        <div className='content'>
          <h2>Professional Summary</h2>
          <p>{mockData.professionalSummary}</p>
          <h2>Work Experience</h2>
          {mockData.workExperience.map((experience, index) => (
            <div key={index}>
              <p><strong>{experience.company}</strong>, {experience.date}</p>
              <p>{experience.description}</p>
            </div>
          ))}
          <h2>Education</h2>
          <p>{mockData.education.description}</p>
          <h2>License</h2>
          <p>{mockData.license}</p>
          <h2>Skills</h2>
          <p>
            <strong>Technical Skills:</strong> {mockData.skills.technical.join(', ')}<br />
            <strong>Soft Skills:</strong> {mockData.skills.soft.join(', ')}
          </p>
          <div className='button'>
            <button className="primary-btn">revoke</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;


































