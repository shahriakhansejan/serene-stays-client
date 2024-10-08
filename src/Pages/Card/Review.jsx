import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Review = ({ review }) => {
    const { nameR, emailR, photoR, text, currentDate, ratings } = review;
    const rating = ratings;
    return (
        <div className='mt-20 w-full md:w-1/2 lg:w-1/3 border-b'>
            <div className='flex items-center gap-3'>
                <img className='w-16 h-16 rounded-full' src={photoR} alt="" />
                <span>
                    <h1 className='text-xl font-bold text-[#1c1c1c]'>{nameR}</h1>
                    <p className='text-blue-800 font-semibold'>{emailR}</p>
                </span>
            </div>
            <span className='flex gap-10 my-2 items-center'>


                <div className="rating">
                    <input defaultChecked={rating === 1} type="radio" className="mask mask-star-2 bg-orange-400" />
                    <input defaultChecked={rating === 2} type="radio" className="mask mask-star-2 bg-orange-400" />
                    <input defaultChecked={rating === 3} type="radio" className="mask mask-star-2 bg-orange-400" />
                    <input defaultChecked={rating === 4} type="radio" className="mask mask-star-2 bg-orange-400" />
                    <input defaultChecked={rating === 5} type="radio" className="mask mask-star-2 bg-orange-400" />
                </div>

                <p>{currentDate.slice(0, 10)}</p>
            </span>
            <p className='mt-4 text-[#323232]'>
                {text ? text : '..........'}
            </p>

        </div>
    );
};

Review.propTypes = {

};

export default Review;