import React, { useState } from "react";
import Popup from "./Popup";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const Ratings = ({ _id, setReFetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [bookingData, setBookingData] = useState([]);
  useState(() => {
    axiosSecure.get(`/bookings?email=${user.email}`).then((res) => {
      setBookingData(res.data);
    });
  }, []);

  const [rating, setRating] = useState(1);
  const handleRating = (value) => {
    if (!bookingData.length) {
      alert("You have to booked after review");
      return 
    } else {
      setRating(value);
      document.getElementById("my_modal_1").showModal();
    }
  };

  return (
    <div>
      <button>
        <div className="rating">
          <input
            onClick={() => handleRating(1)}
            defaultChecked
            type="radio"
            name="rating-1"
            className="mask mask-star"
          />
          <input
            onClick={() => handleRating(2)}
            type="radio"
            name="rating-1"
            className="mask mask-star"
          />
          <input
            onClick={() => handleRating(3)}
            type="radio"
            name="rating-1"
            className="mask mask-star"
          />
          <input
            onClick={() => handleRating(4)}
            type="radio"
            name="rating-1"
            className="mask mask-star"
          />
          <input
            onClick={() => handleRating(5)}
            type="radio"
            name="rating-1"
            className="mask mask-star"
          />
        </div>
      </button>
      <dialog id="my_modal_1" className="modal">
        <Popup setReFetch={setReFetch} _id={_id} rating={rating}></Popup>
      </dialog>
    </div>
  );
};

Ratings.propTypes = {};

export default Ratings;
