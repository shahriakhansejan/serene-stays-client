import React, { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Subscribe from "../Subscribe/Subscribe";
import FeatureRooms from "../FeatureRooms/FeatureRooms";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const [roomsData, setRoomsData] = useState([]);

  useEffect(() => {
    axiosSecure.get("/rooms").then((res) => setRoomsData(res.data));
  }, [axiosSecure]);

  // console.log(roomsData);
  return (
    <div>
      <div className="carousel max-h-screen w-full">
        {roomsData.map((roomData, index) => (
          <Banner
            roomsData={roomsData}
            roomData={roomData}
            index={index}
            key={roomData._id}
          ></Banner>
        ))}
      </div>
      <h1 className="styleText text-5xl font-bold text-orange-900 text-center my-12">Feature Rooms</h1>
      <div className="grid px-1 grid-cols-1 md:grid-cols-2 gap-12">
        {roomsData.slice(0,4).map((roomData, index) => (
          <FeatureRooms
            roomData={roomData}
            index={index}
            key={roomData._id}
          ></FeatureRooms>
        ))}
      </div>
      <div className="flex justify-center mb-16 my-10">
      <Link to='/rooms'><button className="btn btn-success btn-lg text-white">See all Rooms<FaArrowRightLong /></button></Link>
      </div>
      <div className="px-1">
        <Subscribe></Subscribe>
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
