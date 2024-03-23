import React, { useState } from 'react';
import {Textarea} from "@/components/ui/textarea.jsx";

const Review = () => {
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Basic form validation
        if (rating === 0 || description.trim() === '') {
            setErrorMessage('Please provide both rating and description.');
            return;
        }

        // Reset error message
        setErrorMessage('');

        // Handle submission logic here
        console.log('Rating:', rating);
        console.log('Description:', description);
        // You can submit the data to your backend or do any further processing here

        // Clear form fields after submission
        setRating(0);
        setDescription('');
    };

    return (
        <div className="review-container justify-center flex items-center">
            <div className="mt-[200px] bg-[#2C3639] w-[798px] h-[604px] rounded-lg">
                <div className="p-[80px] text-white">
                    <h2 className='text-[25px]'>Review</h2>
                    <form onSubmit={handleSubmit} className='mt-6'>
                        <div>
                            {[...Array(5)].map((_, index) => {
                                const starValue = index + 1;
                                return (
                                    <span
                                        key={index}
                                        onClick={() => handleRatingChange(starValue)}
                                        style={{ cursor: 'pointer', color: '#000000', fontSize: "18px", borderRadius: "50%", backgroundColor: "#FFFFFF", marginRight: "4px"}}
                                    >
                                        {starValue <= rating ? '★' : '☆'}
                                    </span>
                                );
                            })}
                        </div>
                        <div className='mt-6'>
                            <label htmlFor="description" style={{ color: '#FFFFFF' }} >Description</label>
                            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className='w-[560px] h-[126px] mt-8' style={{ color: '#000000' }} />
                        </div>
                        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                        <div className='mt-[70px] text-center'>
                            <button type="submit" style={{ color: '#000000', padding: '10px 50px' }} className='bg-[#5E8D83]'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Review;
