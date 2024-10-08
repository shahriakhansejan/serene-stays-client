import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from 'react-icons/fa6';

const FeatureRooms = ({roomData}) => {
    const {
        _id,
        title,
        image,
        RoomDescription,
        PricePerNight,
        RoomSize,
        Availability,
        SpecialOffers,
      } = roomData;
    return (
        <div>
            <div className="card bg-base-100 image-full shadow-xl">
  <figure>
    <img
      src={image}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="styleText text-4xl text-green-300 mb-7 font-bold">{title}</h2>
    <p>{RoomDescription.slice(0,150)} ......</p>
    <div className="card-actions justify-end">
    <Link to={`/rooms/${_id}`}>
      <button className="text-3xl px-5 py-2 rounded-lg hover:border-2"><FaArrowRightLong /></button>
      </Link>
    </div>
  </div>
</div>
        </div>
    );
};

FeatureRooms.propTypes = {
    
};

export default FeatureRooms;