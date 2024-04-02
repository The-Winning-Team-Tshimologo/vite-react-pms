import React, { useState } from 'react';
import dummyData from './DummyData.jsx';
import './JobRequest.css'; // Import the CSS file
import dummyWithRate from '../helpwanted/dummyDataWithRate.jsx'

import JobRequestItem from "@/components/JobRequestItem/JobRequestItem.jsx";
import JobHeader from "@/components/jobheader/JobHeader.jsx";
import { Button } from "@/components/ui/button.jsx";
import HelpWanted from "@/components/helpwanted/HelpWanted.jsx";

function JobRequest() {
    const [showAllItems, setShowAllItems] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const itemsToShow = showAllItems ? dummyData : dummyData.slice(0, 4); // Assuming initially showing 4 items

    const handleReadMore = () => {
        setShowAllItems(!showAllItems);
        setLoadedItems(showAllItems ? 4 : dummyData.length); // Reset loaded items on toggle
    };
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredItems = itemsToShow.filter(item =>
        item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.service.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="job-container">
            <div className="center-content">
                <JobHeader onSearch={handleSearch} />
            </div>
            <div className="job-request">
                <h2 className='font-bold text-[25px] mb-7'>My Job requests</h2>
                <div className="track-job justify-center w-[1500px]">
                    <h3 className=" ml-[140px] py-2 font-bold text-[18px]">Track recent job requests</h3>
                    {filteredItems.length > 0 ? (
                        <ul className='mb-7 ml-[120px]'>
                            {filteredItems.map((item, index) => (
                                <JobRequestItem key={index} item={item} />
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Nothing found</p>
                    )}
                    <div className="text-center"> {/* Added text-center class */}
                        <Button className="read-more-button p-7 mb-7 bg-[#576E6A]" onClick={handleReadMore}>
                            {showAllItems ? "Show Less" : "Read More"}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="help-wanted  w-[1500px]  mt-9">
                <h2 className='font-bold text-[25px] mb-7'>Help wanted</h2>
                <div className="grid grid-cols-2 gap-1 ml-[120px]">
                    {dummyWithRate.map((item, index) => (
                        <HelpWanted key={index} item={item} />
                    ))}
                </div>
            </div>



        </div>
    );
}

export default JobRequest;
