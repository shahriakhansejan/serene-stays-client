import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLoaderData, useParams } from "react-router-dom";
import { FaChartArea, FaPlus } from "react-icons/fa";
import Ratings from "./Ratings";
import { LuDollarSign } from "react-icons/lu";
import useAuth from "../../hooks/useAuth";
import Review from "./Review";
import BookedForm from "./BookedForm";
import moment from "moment";
import axios from "axios";

const RoomDetails = () => {
  const { id } = useParams();
  const { user, userData } = useAuth();

  const loadedData = useLoaderData(); 
  const [room, setRoom] = useState(loadedData); 

  const [loading, setLoading] = useState(false); 

  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    const fetchRoomData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://serene-stays-server.vercel.app/rooms/${id}`
        ); 
        setRoom(response.data); 
      } catch (error) {
        console.error("Error fetching room data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [reFetch]);
  



  if (loading) {
    return <progress className="progress w-full"></progress>;
  }

  const {
    _id,
    title,
    image,
    RoomDescription,
    PricePerNight,
    RoomSize,
    Availability,
    SpecialOffers,
    reviews,
  } = room;

  const checkInDate = moment(Availability.checkIn, "YYYY-MM-DD");
  const checkOutDate = moment(Availability.checkOut, "YYYY-MM-DD");
  const today = moment().startOf();

  return (
    <div className="px-2 lg:px-0">
      <h1 className="text text-xl md:text-3xl font-bold text-green-800 text-center my-6 border-b">
        Details of {title}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-1 lg:col-span-2">
          <img className="rounded" src={image} alt="" />
        </div>
        <div className="flex flex-col justify-between">
          <span>
            <h1 className="text-xl md:text-4xl font-extrabold mb-5 text-[#1c1c1c]">
              {title}
            </h1>
            <p className="text-justify text-base md:text-lg font-medium text-[#444444]">
              {RoomDescription}
            </p>
          </span>
          <span className="flex flex-col gap-4 md:flex-row justify-between my-3 md:my-0 items-start md:items-center">
            {
              //  onClick={()=>handleBookings(_id)}
              today.isBetween(checkInDate, checkOutDate, undefined, "[]") ? (
                <h1 className="text-xl font-extrabold ml-2 text-red-700">
                  Booked
                </h1>
              ) : (
                <button
                  onClick={() =>
                    document.getElementById("my_modal_2").showModal()
                  }
                  className="flex gap-2 px-3 py-2 rounded hover:border-2 border-[#52624f] items-center text-xl font-bold text-[#52624f]"
                >
                  Book Now <FaPlus />{" "}
                </button>
              )
            }

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_2" className="modal">
              <BookedForm setReFetch={setReFetch}  room={room}></BookedForm>
            </dialog>

            <p className="flex items-center text-yellow-700 font-semibold text-xl md:text-2xl">
              <LuDollarSign className="text-2xl md:text-3xl" />
              {PricePerNight} per Night
            </p>
          </span>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-8 lg:flex-row items-start lg:items-center justify-between">
        <div className="">
          <h1 className="text-xl text-yellow-500 font-bold">Rate & Review</h1>
          <span className="flex flex-col md:flex-row gap-4 mt-3 items-center border-b-2">
            <img
              className="w-12 h-12 rounded-full"
              src={user?.photoURL ? user.photoURL : userData?.photo}
              alt=""
            />
            <span>
              <p className="font-semibold text-lg mb-1 text-blue-500">
                {user?.email}
              </p>
              <Ratings setReFetch={setReFetch} _id={_id}></Ratings>
            </span>
          </span>
        </div>
        <div className="mt-12">
          <h1 className="text-2xl font-bold my-4 text-[#1c1c1c]">
            Our Facilities:
          </h1>

          <span>
            <h4 className="flex flex-col md:flex-row gap-2 text-green-800 text-xl my-3 font-bold items-center">
              <FaChartArea className="text-2xl" /> {RoomSize}{" "}
              {SpecialOffers ? (
                <p className="text-green-800 text-xl font-bold">
                  / {SpecialOffers}
                </p>
              ) : (
                ""
              )}
            </h4>
          </span>

          <p className="text-lg flex items-center gap-2 font-semibold text-pink-900">
            <FaPlus />
            Swimming pool area
          </p>
          <p className="text-lg flex items-center gap-2 font-semibold text-pink-900">
            <FaPlus />
            Fitness and gym
          </p>
          <p className="text-lg flex items-center gap-2 font-semibold text-pink-900">
            <FaPlus />
            Spa and wellness
          </p>
          <p className="text-lg flex items-center gap-2 font-semibold text-pink-900">
            <FaPlus />
            Conference meeting rooms
          </p>
        </div>
      </div>

      <div className="mt-8">
        {reviews ? (
          reviews
            .slice()
            .reverse()
            .map((review, index) => (
              <Review key={index} review={review}></Review>
            ))
        ) : (
          <p className="text-xl">No review here</p>
        )}
      </div>
    </div>
  );
};

RoomDetails.propTypes = {};

export default RoomDetails;
