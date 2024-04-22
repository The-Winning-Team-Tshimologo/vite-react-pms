import './Update.css'
import React from 'react'
import Sidebar from '../sidebar'
import Logo from '../../assets/pms-logo.png'
import Profile from '../../assets/sbusisoAvatar.png'
function update() {
    return (
        <>
            <div className='update'>
                <div className='header'>
                    <Sidebar />
    
                    <div className='logo'>
                        <img src={Logo} alt="Logo" className="round-image" />
                    </div>
    
                    <div className="profile">
                        <img src={Profile} alt="Profile" className="round-image" />
                        <span>Rea Motho</span> 
                    </div>
    
                    <div className="menu-dots">
                        <div className="menu-dot"></div>
                        <div className="menu-dot"></div>
                        <div className="menu-dot"></div>
                    </div>
                </div>
    
                <div className='avatar'>
                    <h3>Update Avatar</h3>
                    <img src={Profile} alt="Avatar" className="round-image" />
                    <div className='button'>
                        <button className="primary-btn">Save</button>
                    </div>
                </div>
    
               
                <div className='content'>
                    <h2>Personal Summary</h2>
                    <textarea id="myTextarea" name="myTextarea" rows="4" cols="50"></textarea>
                    <div className='button'>
                        <button className="primary-btn">Save</button>
                    </div>
                    
                    <h2>Work Experience</h2>
                    <textarea id="myTextarea" name="myTextarea" rows="4" cols="50"></textarea>
                    <div className='button'>
                        <button className="primary-btn">Save</button>
                    </div>
                    
                    <h2>Address</h2>
                    <textarea id="myTextarea" name="myTextarea" rows="4" cols="50"></textarea>
                    <div className='button'>
                        <button className="primary-btn">Save</button>
                    </div>
                </div>
            </div>
        </>
    );
    
}

export default update
