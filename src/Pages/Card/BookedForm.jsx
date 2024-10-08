import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BookedForm = ({ room, setReFetch }) => {
  const { user, userData } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    title,
  } = room;

  const today = new Date().toISOString().split("T")[0];
  // booking form
  const roomId = _id
  const handleBookingForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const checkIn = form.checkIn.value;
    const checkOut = form.checkOut.value;
    const bookedDate = { checkIn, checkOut };
    const bookedForm = { roomId, email, bookedDate };
    // console.log(bookedDate);

    axiosSecure.patch(`/rooms/${roomId}`, bookedDate).then((res) => {
      // console.log(res.data);
      if (res.data.modifiedCount > 0) {
        document.getElementById("my_modal_2").close();
        axiosSecure.post('/bookings', bookedForm)
          .then(res => {
            // console.log(res.data)
            if(res.data.insertedId){
              setReFetch(prev => !prev);
            }
        
          })
      }
    });
    
  };

 

  return (
    <div className="modal-box">
      <div className="flex justify-end text-2xl font-semibold">
        <button
          onClick={() => document.getElementById("my_modal_2").close()}
          className=""
        >
          X
        </button>
      </div>
      <h3 className="font-bold text-lg">Booking Form of {title}</h3>

      <form onSubmit={handleBookingForm} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={user?.email}
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <span className="flex gap-1">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Check In</span>
            </label>
            <input
              type="date"
              name="checkIn"
              defaultValue={today}
              placeholder="Check-In"
              className="input input-bordered checkedDate"
              required
            />
           
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Check Out</span>
            </label>
            <input
              type="date"
              name="checkOut"
              placeholder="Check-Out"
              className="input input-bordered checkedDate"
              required
            />
          </div>
        </span>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Confirm</button>
        </div>
      </form>
    </div>
  );
};

BookedForm.propTypes = {};

export default BookedForm;
