import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import BookingCard from "./BookingCard";

const BookingsCard = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
 
    if (user?.email) {
      axiosSecure.get(`/bookings?email=${user?.email}`).then((res) => {
        // console.log(res.data);
        setBookings(res.data);
     
      });
    }
  }, [user?.email, axiosSecure ]);



  return (
    <div className="my-8">
      <h1 className="text-5xl font-bold mb-12 styleText text-center text-yellow-700">
        Booked by You
      </h1>
      <div>
        {bookings.map((booking) => (
          <BookingCard setBookings={setBookings} bookings={bookings} booking={booking} key={booking._id}></BookingCard>
        ))}
      </div>
      
    </div>
  );
};

BookingsCard.propTypes = {};

export default BookingsCard;
