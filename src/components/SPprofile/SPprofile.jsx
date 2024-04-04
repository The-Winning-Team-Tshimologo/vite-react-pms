import React from 'react'
import "./SPprofile.css"

import React from 'react'
import { Rating } from '@mui/material'
import { FaArrowAltCircleRight, FaArrowCircleLeft, FaDropbox, FaSearch, FaStar } from 'react-icons/fa'
import { FaBarsProgress, FaFaceFrown, FaFaceSmile } from 'react-icons/fa6'

const SPprofile = () => {
  return (
    <div className='spprofile'>
      <div className='spprofile_head flex'>
        <div className='spprofile_image'>
          <img
            src={image}
            alt=''
          />
        </div>
        <div className='spprofile_title'>
          <h2>{name}Sibusiso Mabaso</h2>
          <div>{Rating}</div>
        </div>
        
      </div>
      <div className='spprofile_container flex'>
        
        <div className='spprofile_article'>
          <div className='spprofile_professional-summary'>
            <h2>Professional Summary</h2>
            {professionalSummary}
          </div>
          <div className='spprofile_professional-summary'>
            <h2>Work Experience</h2>
            {workExperience}
          </div><div className='spprofile_professional-summary'>
            <h2>Education</h2>
            {education}
          </div><div className='spprofile_professional-summary'>
            <h2>License</h2>
            {license}
          </div><div className='spprofile_professional-summary'>
            <h2>Skills</h2>
            <ul>
              <li>
                {softSkills}
              </li>
              <li>                
                {techSkills}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='spprofile_buttons'>
        <button type="submit">Message</button>
        <button>Log Issue</button>
      </div>      
    </div>
  )
}

const reviews = () => {
  return(
    <>
      <div className='reviews_box'>
        <div>
          <h2>Reviews</h2>
          <p>Customers rated this pro highly for <span>work quality, professionalism,</span> and <span>value.</span></p>
        </div>

        <div className='reviews_score'>
          <h2>Great 4.8</h2>
          <FaStar
            className='reviews_stars'
          />
          <p>17 reviews</p>
        </div>
        <hr 
          className='reviews_vertical'
        />
        <div className='reviews_score'>
          <div className='reviews_levels'>
            <p>5</p>
            <FaStar/>
            <FaBarsProgress/>
            <p>94%</p>
          </div>
          <div className='reviews_levels'>
            <p>4</p>
            <FaStar/>
            <FaBarsProgress/>
            <p>0%</p>
          </div><div className='reviews_levels'>
            <p>3</p>
            <FaStar/>
            <FaBarsProgress/>
            <p>0%</p>
          </div><div className='reviews_levels'>
            <p>2</p>
            <FaStar/>
            <FaBarsProgress/>
            <p>6%</p>
          </div><div className='reviews_levels'>
            <p>1</p>
            <FaStar/>
            <FaBarsProgress/>
            <p>0%</p>
          </div>
        </div>
        <p>Your trust means everything to us.&nbsp;<a><p>Learn more about our review guidelines.</p></a></p>

        <div className='reviews_field'>
          <div className='reviews_box'>
            <FaSearch
              className='reviews_search'
              alt='reviews_search-icon'
            />
          </div>
          <div className='reviews_box'>
            <FaDropbox
              className='reviews_options'
            />
          </div>

          <div>
            <p>Read reviews that mention:</p>
            <div className='reviews_tags'>
              {tag}
              <p>-</p>
              <div className='reviews_tags-increment'>
                {numberOfReviews}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const reviewTestimonies = () => {
  return (
    <div className='reviews_testimony'>
      <FaArrowCircleLeft/>
      <div className='reviews_testimony-box'>
        <img
          className='reviews_testimony-image'
          alt={reviewImg}
        />
        <hr
          className='reviews_testimony-vertical'
        />
        <div className='reviews_testimony-head'>
          <FaStar/><FaStar/><FaStar/><FaStar/><FaStar/>
          <div>3</div>
          <div>{testimonyDate}</div>
        </div>
        <div>
          <h2>Geyser Leakage</h2>
          {/* <h2>{testimonyIssue}</h2> */}
          <p>I recently faced a geyser leakage issue at home and called a plumbing service for help.
            Their swift response and professional approach were impressive. The technician quickly
            identified and fixed the problem, ensuring a tidy workspace. They also provided valuable
            maintenance tips. The service was reasonably priced, and overall, it was a positive 
            experience. I highly recommend their efficient and reliable plumbing services.
          </p>
          {/* <p>{testimonyPost}</p> */}
        </div>
        <hr
          className='reviews_testimony-horizontal'
        />
        <div className='reviews_testimonial-foot'>
          <h4>Was this helpful ?</h4>
          <div className='reviews_testimony-feedback'>
            <FaFaceSmile/>
            <a
              href=''
            >Yes</a>
            <FaFaceFrown/>
            <a
              href=''
            >No</a>
          </div>
        </div>
      </div>
      <div className='reviews_testimony-box'>
        <img
          className='reviews_testimony-image'
          alt={reviewImg}
        />
        <hr
          className='reviews_testimony-vertical'
        />
        <div className='reviews_testimony-head'>
          <FaStar/><FaStar/><FaStar/><FaStar/><FaStar/>
          <div>3</div>
          <div>{testimonyDate}</div>
        </div>
        <div>
          <h2>Geyser Leakage</h2>
          {/* <h2>{testimonyIssue}</h2> */}
          <p>I recently faced a geyser leakage issue at home and called a plumbing service for help.
            Their swift response and professional approach were impressive. The technician quickly
            identified and fixed the problem, ensuring a tidy workspace. They also provided valuable
            maintenance tips. The service was reasonably priced, and overall, it was a positive 
            experience. I highly recommend their efficient and reliable plumbing services.
          </p>
          {/* <p>{testimonyPost}</p> */}
        </div>
        <hr
          className='reviews_testimony-horizontal'
        />
        <div className='reviews_testimonial-foot'>
          <h4>Was this helpful ?</h4>
          <div className='reviews_testimony-feedback'>
            <FaFaceSmile/>
            <a
              href=''
            >Yes</a>
            <FaFaceFrown/>
            <a
              href=''
            >No</a>
          </div>
        </div>
      </div>
      <FaArrowAltCircleRight/>
    </div>
  )
}

export default SPprofile
