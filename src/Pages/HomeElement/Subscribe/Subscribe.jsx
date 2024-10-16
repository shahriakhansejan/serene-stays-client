import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import Swal from "sweetalert2";
import axios from "axios";

const Subscribe = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth();

  const handleSubscribe = event => {
    event.preventDefault();
    const email = event.target.email.value;
    console.log(email);
    const subscriber = { email }


    axios.get(`https://serene-stays-server.vercel.app/subscribe?email=${user.email}`)
      .then(res => {
        console.log(res.data)
        const alreadySubscribe = res.data.email
        if (alreadySubscribe) {
          return alert('Already Subscribed')
        }
        axiosSecure.post('/subscribe', subscriber)
          .then(res => {
            console.log(res.data)
            if (res.data.insertedId) {
              Swal.fire("Subscribe added Successfully!");
            }
          })

      })



  }
  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 lg:gap-12 items-center p-4 md:p-12 my-8 bg-[url('https://i.postimg.cc/x10c5hs9/pexels-pixabay-260922.jpg')] bg-black/50 bg-blend-multiply rounded-2xl bg-center container mx-auto">
      <div className="w-full flex-1">
        <iframe
          title="Google Map"
          className="w-full h-[300px] border-0 rounded-lg"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Brain%20Craft%20Limited+(Serene%20Stays)&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        />
      </div>

      <div className="flex-1 p-2">
        <div className="">
          <div>
            <h1 className="text-[28px] text-white px-2 font-bold mb-3">
              Please subscribe to our newsletter for updates, deals, and exclusive offers.
            </h1>
          </div>
          <div className="">
            <form onSubmit={handleSubscribe} className="join">
              <input
                className="input input-bordered text-sm md:text-base bg-white join-item"
                placeholder="Email"
                defaultValue={user?.email}
                name="email"
              />
              <button className="btn bg-red-600 hover:bg-red-800 text-white join-item rounded-r-full">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Subscribe.propTypes = {};

export default Subscribe;
