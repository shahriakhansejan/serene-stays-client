import React, { useEffect, useState } from 'react';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import Room from './Room';
import useAuth from '../../hooks/useAuth';

const Rooms = () => {
    const { loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        axiosSecure.get('/rooms')
            .then(res => {
                setRooms(res.data)
            })
    }, [axiosSecure])

    if (loading) {
        return <progress className="progress w-full"></progress>
    }
    return (
        <div className='my-12'>
            <h2 className='text-center font-bold text-5xl text-yellow-800 border-b styleText mb-4'>Available Rooms</h2>
            {/* <div className='grid gap-5 grid-cols-3'> */}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    rooms.map(room => <Room room={room} key={room._id}></Room>)
                }
            </div>

            {/* <div className=''>
                    <div className="card-body rounded-lg bg-[#faf9f5]">
                        <h2 className='text-2xl font-bold mb-8'>Check Availability</h2>
                        <form>
                            <div className="form-control">
                                <label className="label">
                                    <span className="text-lg font-medium">Check - In</span>
                                </label>
                                <input type="date" placeholder="Form" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-5">
                                <label className="label">
                                    <span className="text-lg font-medium">Check - Out</span>
                                </label>
                                <input type="date" placeholder="To" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary ">Check Availability</button>
                            </div>
                        </form>
                    </div> */}
            {/* </div> */}
            {/* </div> */}
        </div>
    );
};



export default Rooms;