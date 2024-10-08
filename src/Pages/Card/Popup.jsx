import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Popup = ({ _id, rating, setReFetch }) => {
  const { user, userData } = useAuth();
  const [ratings, setRatings] = useState(rating.value);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setRatings(rating);
  }, [rating]);

  const handleRatingChange = (event) => {
    setRatings(parseInt(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const text = form.text.value;

    const nameR = user?.displayName ? user.displayName : userData?.name;
    const emailR = user?.email;
    const photoR = user?.photoURL ? user.photoURL : userData?.photo;

    const review = { nameR, emailR, photoR, text, ratings };
    // console.log(review);

    axiosSecure.post(`/rooms/${_id}`, review).then((res) => {
      // console.log(res.data);
      if (res.data.modifiedCount > 0) {
        setReFetch(prev => !prev);
        Swal.fire({
          title: "Success!",
          text: "Review added successfully",
          icon: "success",
        });
        document.getElementById("my_modal_1").close();
        form.reset();
      }
    });
  };
  return (
    <div className="modal-box w-11/12 w-5xl">
      <div className="flex justify-end">
        <button
          onClick={() => {
            document.getElementById("my_modal_1").close();
          }}
          className="font-bold text-2xl"
        >
          X
        </button>
      </div>
      <div className="">
        <span className="flex items-center gap-3">
          <img
            className="w-16 h-16 rounded-full"
            src={user?.photoURL ? user.photoURL : userData?.photo}
            alt=""
          />
          <span>
            <h2 className="text-xl mb-1 font-bold">
              {user?.displayName ? user.displayName : userData?.name}
            </h2>
            <h3 className="font-medium">Rate your experience!</h3>
          </span>
        </span>
        <span>
          <div
            name="stars"
            className="rating rating-lg my-6 flex justify-evenly"
          >
            <input
              type="radio"
              name="ratings-1"
              checked={ratings === 1}
              value="1"
              onChange={handleRatingChange}
              className="mask bg-yellow-600 mask-star"
            />
            <input
              type="radio"
              name="ratings-1"
              checked={ratings === 2}
              value="2"
              onChange={handleRatingChange}
              className="mask bg-yellow-600 mask-star"
            />
            <input
              type="radio"
              name="ratings-1"
              checked={ratings === 3}
              value="3"
              onChange={handleRatingChange}
              className="mask bg-yellow-600 mask-star"
            />
            <input
              type="radio"
              name="ratings-1"
              checked={ratings === 4}
              value="4"
              onChange={handleRatingChange}
              className="mask bg-yellow-600 mask-star"
            />
            <input
              type="radio"
              name="ratings-1"
              checked={ratings === 5}
              value="5"
              onChange={handleRatingChange}
              className="mask bg-yellow-600 mask-star"
            />
          </div>
        </span>

        {/* form section */}

        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="font-semibold">
                Share more about your experience:
              </span>
            </label>
            <textarea
              placeholder="Share details of your own experience at our service"
              className="w-full h-16 border p-2"
              name="text"
              id=""
            ></textarea>
          </div>

          <button className="btn btn-info w-full text-lg font-bold text-white my-4">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

Popup.propTypes = {};

export default Popup;
