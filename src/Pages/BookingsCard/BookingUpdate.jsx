import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingUpdate = ({ booking, setReFetch }) => {
  const axiosSecure = useAxiosSecure();
  const { _id, email, roomId, bookedDate } = booking;
  const today = new Date().toISOString().split("T")[0];

  const [hideDates, setHideDates] = useState([]);
  // const {bookedDate} = hideDates;

  useEffect(() => {
    axiosSecure.get(`/bookings-date?id=${roomId}`).then((res) => {
      setHideDates(res.data);
    });
  }, [axiosSecure, roomId]);

  const stringToDate = (dateString) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split("-");
    return new Date(year, month - 1, day); // Month is 0-based in JS Date
  };

  const getDisabledDates = (checkIn, checkOut) => {
    const disabledDates = [];
    let currentDate = stringToDate(checkIn);
    const endDate = stringToDate(checkOut);

    if (!currentDate || !endDate) return [];
    while (currentDate <= endDate) {
      disabledDates.push(new Date(currentDate)); // Add the current date to the array
      currentDate.setDate(currentDate.getDate() + 1); // Increment by 1 day
    }

    return disabledDates;
  };

  // Combine all disabled dates from booked date ranges
  const getAllDisabledDates = (Dates) => {
    let allDisabledDates = [];
    // console.log(allDisabledDates)
    Dates.forEach(({ bookedDate }) => {
      const { checkIn, checkOut } = bookedDate;
      const disabledDates = getDisabledDates(checkIn, checkOut);
      allDisabledDates = [...allDisabledDates, ...disabledDates]; 
    });

    return allDisabledDates;
  };


  const disabledDates = getAllDisabledDates(hideDates);

  const handleBookingForm = (event) => {
    event.preventDefault();
    const checkIn = new Date(startDate).toISOString().slice(0, 10);
    const checkOut = new Date(endDate).toISOString().slice(0, 10);
    const updateBookedDate = { checkIn, checkOut };

    axiosSecure.patch(`/rooms/${roomId}`, updateBookedDate).then((res) => {
      if (res.data.modifiedCount > 0) {
        axiosSecure.patch(`/bookings/${_id}`, updateBookedDate).then((res) => {
          if (res.data.modifiedCount > 0) {
            setReFetch((prev) => !prev);
            document.getElementById(`${_id}`).close();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Booking Updated Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  const [startDate, setStartDate] = useState(
    bookedDate?.checkIn ? new Date(bookedDate.checkIn) : null
  );
  const [endDate, setEndDate] = useState(
    bookedDate?.checkOut ? new Date(bookedDate.checkOut) : null
  );

  return (
    <div className="modal-box">
      <div className="flex justify-end text-2xl font-semibold">
        <button
          onClick={() => document.getElementById(`${_id}`).close()}
          className=""
        >
          X
        </button>
      </div>
      <h3 className="font-bold text-sm md:text-lg">Booking Form of {email}</h3>

      <form onSubmit={handleBookingForm} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            defaultValue={email}
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <span className="flex flex-col md:flex-row gap-1">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Check In</span>
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)} 
              dateFormat="yyyy-MM-dd"
              minDate={today} 
              excludeDates={disabledDates} 
              className="input input-bordered"
              placeholderText="Select Check-In Date"
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Check Out</span>
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)} 
              dateFormat="yyyy-MM-dd" 
              minDate={startDate} 
              excludeDates={disabledDates} 
              className="input input-bordered"
              placeholderText="Select Check-Out Date"
              required
            />
          </div>
        </span>
        <div className="form-control mt-6">
          <p className="font-semibold ml-2 mb-1 text-red-600">!!!Disable days booked by others</p>
          <button className="btn btn-primary">Confirm</button>
        </div>
      </form>
    </div>
  );
};

BookingUpdate.propTypes = {
  booking: PropTypes.object.isRequired,
  setReFetch: PropTypes.func.isRequired,
};

export default BookingUpdate;
