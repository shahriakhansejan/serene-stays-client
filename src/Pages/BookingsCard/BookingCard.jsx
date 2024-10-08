import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import BookingUpdate from "./BookingUpdate";
import useAuth from "../../hooks/useAuth";
import moment from "moment";

const BookingCard = ({ booking,bookings, setBookings }) => {
  // const [loading, setLoading] = useState(false);
const axiosSecure = useAxiosSecure();
const [bookedRooms, setBookedRooms] = useState([]);
const { _id, email, roomId, bookedDate } = booking;

const [reFetch, setReFetch ] = useState(false);

const [loading, setLoading ] = useState(false)

useEffect(() => {
  setLoading(true)
  axiosSecure.get(`/rooms/${roomId}`)
  .then((res) => {
    setBookedRooms(res.data);
    // console.log(res.data);
    setLoading(false)
  
  });
}, [axiosSecure, roomId, reFetch]);


  const {
    title,
    image,
    Availability
  } = bookedRooms;

  const updateBookingDate = moment(Availability?.checkIn).subtract(2, 'days').format('YYYY-MM-DD');
  const todayDate = moment().format('YYYY-MM-DD')
  const sameOrPast = moment(todayDate).isSameOrAfter(updateBookingDate)


  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "long" });
    const year = String(date.getFullYear()).slice(-2);
    return `${day} ${month} ${year}`;
  };
  const checkIn = formatDate(Availability?.checkIn);
  const checkOut = formatDate(Availability?.checkOut);

  // cancel function
  const handleCancel = () => {
    // console.log(roomId)
    const bookedDate = { checkIn: "0000-00-00", checkOut: "0000-00-00" };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it !",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${_id}`).then((res) => {
          // console.log(res.data);
          if (res.data.deletedCount) {
            axiosSecure.patch(`/rooms/${roomId}`, bookedDate).then((res) => {
              // console.log(res.data);
              if (res.data.modifiedCount) {
                const remaining = bookings.filter(
                  (rBooking) => rBooking._id !== _id
                );
                setBookings(remaining);
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
              }
            });
          }
        });
      }
    });
  };

  const handleUpdate=()=>{
    document.getElementById(`${_id}`).showModal()
    // console.log(roomId)
  }


if(loading){
  <progress className="progress w-full"></progress>
}

  return (
    <div className="flex flex-col bg-[#f9f9f9] rounded-lg shadow-lg p-1 mb-5 lg:flex-row">
      <figure className="w-2/3">
        <img src={image} className="rounded" alt="Album" />
      </figure>
      <div className="card-body">
        <h1 className="text-2xl font-bold">{title}</h1>
        <h2 className="font-bold text-blue-700">@:{email}</h2>
        <p className="text-lg font-semibold text-pink-700">
          Check In: {checkIn} <br /> Check Out: {checkOut}
        </p>

        <div className="">
          <span className="flex justify-between mb-3">
            {
              sameOrPast?  <button onClick={()=>{
                alert('Available at least 2 days before check-in')
              }} className="btn btn-error btn-sm text-white">Cancel</button> : <button
              onClick={handleCancel}
              className="btn btn-error btn-sm text-white"
            >
              Cancel
            </button> 
            }
            <div>
            <button
              onClick={handleUpdate}
              className="btn btn-info text-white btn-sm"
            >
              Update
            </button>
            <dialog id={_id} className="modal">

                <BookingUpdate setReFetch={setReFetch} booking={booking}></BookingUpdate>
            </dialog>
            </div>

           
            
          </span>
          <Link to={`/rooms/${roomId}`}>
            <button className="btn w-full text-white font-bold btn-success">
              View Details
            </button>
          </Link>
        </div>
      </div>
 
    </div>
  );
};

BookingCard.propTypes = {};

export default BookingCard;
