import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { LuDollarSign } from "react-icons/lu";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";

const Room = ({ room }) => {
  
  const {
    _id,
    title,
    image,
    RoomDescription,
    PricePerNight,
    RoomSize,
    Availability,
    SpecialOffers,
  } = room;


  const [available, setAvailable] = useState(true);

  const { checkIn, checkOut } = Availability;
  const checkInDate = moment(checkIn, "YYYY-MM-DD");
  const checkOutDate = moment(checkOut, "YYYY-MM-DD");
  // console.log(checkInDate, checkOutDate);
  const today = moment().startOf();

  useEffect(()=>{
    today.isBetween(checkInDate, checkOutDate, undefined, '[]') ? setAvailable(false) : setAvailable(true)
  },[available])

  return (
    <div className="card card-compact border bg-[#faf9f5]">
      <Link to={`/rooms/${_id}`}>
        <figure className="p-2">
          <img className="rounded-t-lg relative" src={image} alt="Shoes" />
        </figure>
      </Link>
      {available ? (
        <p className="bg-green-500 z-10 text-end absolute ml-3 mt-3 px-2 rounded-md text-sm text-white font-bold">
          available
        </p>
      ) : (
        <p className="bg-red-500 z-10 text-end absolute ml-3 mt-3 px-2 rounded-md text-sm text-white font-bold">
          booked
        </p>
      )}
      <div className="flex flex-col justify-between p-5">
        <span className="flex justify-between">
          <h2 className="text-xl font-bold text-[#1c1c1c]">{title}</h2>
          <h4 className="flex items-center font-semibold text-lg">
            <span className="text-pink-600">from </span>
            <LuDollarSign className="text-xl text-green-600" />
            {PricePerNight}
          </h4>
        </span>
        <span>
          <h5 className="text-lg text-pink-600 font-semibold">
            {RoomSize} /2 person
          </h5>
          <p className="text-justify text-[#363636] font-medium my-4">
            {RoomDescription.slice(0, 100)}..._
          </p>
        </span>
      </div>
    </div>
  );
};

Room.propTypes = {};

export default Room;
