import React from "react";
import "./ProfessionalProfileCard.css";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

// Mock data for professional's profile (this would typically be fetched from an API)
const professionalProfile = {
  name: "Sibusiso Mabaso",
  profession: "Plumber",
  location: "Johannesburg, Gauteng",
  reviewsCount: 126,
  projectsCompleted: 10,
  hourlyRate: 300,
  availability: ["Mon", "Tue", "Wed"],
  rating: 4,
  professionalSummary:
    "Efficient plumber with 7+ years of experience. Skilled in PEX and copper installation, repair, and maintenance...",
  experience: [
    {
      title: "Plumber",
      company: "Dickinson Elwood Plumbing",
      dateRange: "May 2013–May 2019",
      achievements: [
        "Worked in a high-volume plumbing business, completing 10–30 client calls per week.",
        "Installed new plumbing systems on 20+ $1M–$3M homes.",
      ],
    },
    {
      title: "Plumber",
      company: "Jim’s Rooter of Lexington",
      dateRange: "April 2012–June 2013",
      achievements: [
        "Answered 50+ customer calls per week.",
        "Maintained upsell rate 15% higher than franchise average.",
      ],
    },
  ],
  education: {
    institution: "Ivy Tech Community College of Lexington",
    degree: "Vocational Training and Apprenticeship",
    accolades: [
      "Commended 6x by the contractor I apprenticed with for efficiency.",
      "Excelled in new installation instruction.",
    ],
  },
  license: "Journeyman License #8823473, Kentucky Division of Plumbing",
  skills: {
    technicalSkills:
      "Installation, repair, PEX, copper, sewage lines PVC, venting",
    softSkills:
      "Physical fitness, problem solving, strong work ethic, customer service",
  },
};

const ProfessionalProfileCard = ({ useButtons, useDocs }) => {
  return (
    <div className="professional-profile__card">
      <div className="professional-profile__header">
        <img
          src="/src/assets/sbusisoAvatar.png"
          alt={professionalProfile.name}
          className="professional-profile__image"
        />
        <div className="professional-profile__header-info">
          <h2 className="professional-profile__name">
            {professionalProfile.name}
            <div className="professional-profile__rating">
              {professionalProfile.rating}/5 ★
            </div>
          </h2>
          <div className="professional-profile__profession-info">
            <p className="professional-profile__profession">
              {professionalProfile.profession}
            </p>
            <p> {professionalProfile.location} </p>
          </div>

          <div className="professional-profile__details">
            <span className="professional-profile__reviews">
              {professionalProfile.reviewsCount} Reviews
            </span>
            <span className="professional-profile-horizontal-divider"></span>
            <span className="professional-profile__reviews">
              Projects Completed {professionalProfile.reviewsCount}
            </span>
            <span className="professional-profile-horizontal-divider"></span>
            <span className="professional-profile__rate">
              R{professionalProfile.hourlyRate} per hour
            </span>
            <span className="professional-profile-horizontal-divider"></span>
            <span className="professional-profile__availability">
              <p className="w-fit">Availability:</p>{" "}
              {professionalProfile.availability.join(", ")}
            </span>
          </div>
          <div className="professional-profile__ratings"></div>
          <div className="professional-profile__rate-availability"></div>
        </div>
      </div>
      <div className="professional-profile__body-details">
        <div className="professional-profile__summary">
          <h3 className="professional-profile__text-bold">
            Professional Summary
          </h3>
          <p>{professionalProfile.professionalSummary}</p>
        </div>
        <div className="professional-profile__experience">
          <h3 className="professional-profile__text-bold">Work Experience</h3>
          {professionalProfile.experience.map((job, index) => (
            <div key={index} className="professional-profile__job">
              <h4>
                {job.title} at {job.company}
              </h4>
              <p>{job.dateRange}</p>
              {job.achievements.map((achievement, index) => (
                <p key={index}>• {achievement}</p>
              ))}
            </div>
          ))}
        </div>
        <div className="professional-profile__education">
          <h3 className="professional-profile__text-bold">Education</h3>
          <p>{professionalProfile.education.institution}</p>
          <p>{professionalProfile.education.degree}</p>
          {professionalProfile.education.accolades.map((accolade, index) => (
            <p key={index}>• {accolade}</p>
          ))}
        </div>
        <div className="professional-profile__license">
          <p>{professionalProfile.license}</p>
        </div>
        <div className="professional-profile__skills">
          <h3 className="professional-profile__text-bold">Skills</h3>
          <p>{professionalProfile.skills.technicalSkills}</p>
          <p>{professionalProfile.skills.softSkills}</p>
        </div>
      </div>
      {useButtons && (
        <div className="professional-profile__actions">
          <NavLink className="professional-profile__message-btn" to="/inbox">
            Message
          </NavLink>
          <NavLink className="professional-profile__issue-btn" to="/issues">
            Log Issue
          </NavLink>
          {/* <button className="professional-profile__message-btn">Message</button>
        <button className="professional-profile__issue-btn">Log Issue</button> */}
        </div>
      )}
      {useDocs && (
        <>
          <div className="application-documents__container">
            <div>Document 1</div>
            <div>Document 2</div>
            <div>Document 3</div>
          </div>
          <div className="application-documents-action__btns">
            <Button className="application-document__download-btn">
              Download
            </Button>
            <Button className="application-document__accept-btn">Accept</Button>
            <Button className="application-document__reject-btn">Reject</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfessionalProfileCard;
