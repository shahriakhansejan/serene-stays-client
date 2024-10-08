import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";

const SignUp = () => {
  const { createEmail } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    

    createEmail(email, password)
      .then((result) => {
        console.log(result.user);
        const createAt = result.user.metadata.creationTime
        const user = { name, email, photo, createAt };
        console.log(user);

        axiosSecure.post("/users", user)
        .then((res) => {
          console.log(res.data);
          navigate(location.state? location.state : '/')
        });

      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="bg-[#faf9f5] max-w-4xl mx-auto py-12 my-16 rounded-lg">
      <h1 className="text-5xl font-bold text-[#1c1c1c] text-center">
        Please Sign Up !
      </h1>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mt-8">
            <p className="font-medium ml-1 mb-2">
              Already have an Account ? Please{" "}
              <Link to="/sign-in" className="font-bold text-green-700">
                Sign In
              </Link>
            </p>
            <button className="btn btn-primary">Sign Up</button>
          </div>
        </form>
        {}
      </div>
    </div>
  );
};

SignUp.propTypes = {};

export default SignUp;
