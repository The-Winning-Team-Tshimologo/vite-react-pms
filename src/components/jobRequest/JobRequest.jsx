import React, { useState } from 'react';
import dummyData from './DummyData.jsx';
import './JobRequest.css'; // Import the CSS file

import JobRequestItem from "@/components/JobRequestItem/JobRequestItem.jsx";
import JobHeader from "@/components/JobHeader/JobHeader.jsx";

function JobRequest() {
    const [showAllItems, setShowAllItems] = useState(false);
    const itemsToShow = showAllItems ? dummyData : dummyData.slice(0, 3);

    return (
        <div className="job-container">
            <div className="center-content">
                <JobHeader />
            </div>
            <div className="job-request">
                <h2>My Job requests</h2>
                <div className="track-job w-[1500px]">
                    <h3>Track recent job requests</h3>
                    <ul className="justify-center">
                        {itemsToShow.map((item, index) => (
                            <JobRequestItem key={index} item={item} />
                        ))}

                    </ul>
                    <button className="read-more-button" onClick={() => setShowAllItems(!showAllItems)}>
                        {showAllItems ? "Show Less" : "Read More"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default JobRequest;
