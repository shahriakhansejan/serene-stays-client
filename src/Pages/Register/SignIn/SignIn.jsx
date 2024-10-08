import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const SignIn = () => {
    const {googleLogin, signInEmail} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogleLogIn = () =>{
        googleLogin()
        .then(result => {
            console.log(result.user)
            navigate(location.state? location.state : '/')
        })
        .catch(error =>{
            console.error(error)
        })
    }

    const handleEmailLogIn = event =>{
        event.preventDefault();
        const form = event.target
        const email = form.email.value;
        const password = form.password.value;
        
        signInEmail(email, password)
        .then(result =>{
            console.log(result.user)
            navigate(location.state? location.state : '/')
        })
        .catch(error =>{
            console.error(error)
        })
    }
  return (
    <div className="bg-[#faf9f5] max-w-4xl mx-auto py-12 my-16 rounded-lg">
      <h1 className="text-5xl font-bold text-[#1c1c1c] text-center">
        Sign In Now !
      </h1>
      <div className="card-body">
        <form onSubmit={handleEmailLogIn}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
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
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-8">
          <p className="font-medium ml-1 mb-2">
          New User ? Please <Link to='/sign-up' className="font-bold text-green-700">Sign Up</Link>
        </p>
            <button className="btn btn-primary">Sign In</button>
          </div>
        </form>
        
      </div>

      <span>
        <p className="text-lg text-center text-[#323232] font-semibold">Or,</p>
        <div className="flex justify-center mt-8">
          <button onClick={handleGoogleLogIn} className="flex gap-5 items-center font-bold border-2 hover:bg-green-50 border-green-600 px-5 py-2 rounded-full">
            <FcGoogle className="text-3xl" />
            Log In with Google
          </button>
        </div>
      </span>
    </div>
  );
};

SignIn.propTypes = {};

export default SignIn;
