import './footer.css';
import fb from '../assets/fb.png'
import x from '../assets/xcom.png'
import ig from '../assets/ig.png'
 
const footer = () => {
  return (
    <div className='footer'>
      <div className='sb_footer section_padding'>
        <div className='sb_footer-links'>
          <div className='sb_footer-links-home'>
            <a href="/">
              <img
                // src={pms}
                alt='pms'              
              />
            </a>
          </div>
          <div className='sb_footer-links-div'>
            <div className='sb_footer-links-socials'>
            <h4>Follow us</h4>
              <a href="/x.com">
                <img
                  src={x}
                  alt='x'
                />
              </a>
              <a href="facebook.com">
                <img
                  src={fb}
                  alt='fb'
                />
              </a>
              <a href="instagram.com">
                <img
                  src={ig}
                  alt='ig'
                />
              </a>
            </div>
          </div>
          <div className='sb_footer-links-div'>
            <h4>Explore</h4>
              <a href='/hi'>
                <p>Home Improvement</p>
              </a>              
              <a href='/pm'>
                <p>Property Maintenance</p>
              </a>
              <a href='/hi'>
                <p>Home Insurance</p>
              </a>
              <a href='/sec'>
                <p>Security</p>
              </a>
              <a href='/commun'>
                <p>Community</p>
              </a>
          </div>
          <div className='sb_footer-links-div'>
            <h4>Support</h4>
              <a href='/pmspart'>
                <p>PMS Partnership</p>
              </a>
              <a href='/gaurantee'>
                <p>Gaurantee</p>
              </a>
              <a href='/faqs'>
                <p>FAQ & Help</p>
              </a>
              <a href='/s&i'>
                <p>Service & Issues</p>
              </a>
              <a href='/l&s'>
                <p>Log In/Sign Up</p>
              </a>
              <a href='/pro'>
                <p>Be a PRO — Professional Recruitment Operations</p>
              </a>
          </div>
        </div>
      </div>
      
      <hr></hr>
      
      <div className='sb_footer-below'>
        <div className='sb_footer-copyright'>
          <p>
            &copy;{new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>
        <a
          href='/conditions.com'
        >
          <p>Terms & Conditions</p>
        </a>
        <a
          href='/policy.com'
        >
          <p>Privacy Policy</p>
        </a>
        <a
          href='/site'
        >
          <p>Sitemap</p>
        </a>
      </div>
    </div>
  )
}

export default footer
