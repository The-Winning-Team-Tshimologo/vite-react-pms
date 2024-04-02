import React from 'react'
import {MdOutlinePinDrop, MdQuestionMark} from "react-icons/md";
import dummyData from './dummyDataWithRate.jsx'
import {IoMdStar} from "react-icons/io";
import {yellow} from "@mui/material/colors";
const HelpWanted = ({item}) => {

    const formatRating = (rating) => {
        return `${rating.numerator}/${rating.denominator}`;
    };
    return (
        <li className="personal-request w-[491px] bg-[#D9D9D9] border-none	">
            <div className="flex items-center h-auto">
                <img src={item.profilePicture} alt="profile pic" className="w-[50px] h-[50px] mr-4" />
                <div className="information-details-container  flex-row">
                    <div className="detail-container">
                        <div className="ml-10 font-bold">
                            {item.firstName} {item.lastName}<br />
                        </div>
                        <div className="address-container">
                            <div className="address-job flex">
                                <MdOutlinePinDrop size={24} className="mt-[9px] mr-4" />{item.address}<br />{item.city}
                            </div>
                            <div className="service-job flex">
                                <MdQuestionMark size={24} className="mr-4" /> <p className='mr-1'>Requesting </p> {item.service}
                            </div>
                        </div>
                    </div>
                    <div className="two-buttons flex items-center space-x-4">
                        <div className="rating font-bold">{formatRating(item.rate)}</div> {/* Display the rating */}
                        <IoMdStar size={26} style={{ color: "#E5B80B", backgroundColor: "#C4C4C4", borderRadius: "50%" }} />
                    </div>
                </div>
            </div>
        </li>
    );
}
export default HelpWanted
