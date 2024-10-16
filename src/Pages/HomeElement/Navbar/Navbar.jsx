import { Link, NavLink } from "react-router-dom";
import navLogo from "../../../assets/navLogo.png";
import { RiMenu2Fill } from "react-icons/ri";
import useAuth from "../../../hooks/useAuth";
import userImg from "../../../assets/user.svg"

const Navbar = () => {
    const {user, logOut, userData} = useAuth();
    

    const handleLogOut =()=>{
        logOut()
        .then()
        .catch()
    }

  const navItem = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/rooms">Room</NavLink>
      </li>
      <li>
        <NavLink to="/bookings">My Bookings</NavLink>
      </li>
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
    </>
  );
  return (
    <div className=" bg-[#fdf8f5]">
      <div className="navbar container mx-auto py-1">
        <div className="w-2/3 justify-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <RiMenu2Fill className="text-2xl" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content font-semibold activeNav bg-base-100 rounded-box z-[1] mt-3 w-52 p-4 shadow"
            >
              {navItem}
            </ul>
          </div>
          <div className="flex items-center gap-10">
            <img className="w-16 md:w-28" src={navLogo} alt="" />
            <div className="hidden lg:flex">
              <ul className="flex text-[#323232] activeNav font-semibold gap-5">{navItem}</ul>
            </div>
          </div>
        </div>
        <div className="navbar-end">

            {
                user? <span className="flex gap-1 items-center"><div className="tooltip tooltip-bottom" data-tip={user?.displayName? user.displayName : userData?.name}>
                <button><img  className="w-10 md:w-12 rounded-full" src={user?.photoURL? user.photoURL : userData?.photo} alt="img" /></button>
              </div> <button onClick={handleLogOut} className="btn btn-sm md:btn-md font-bold btn-error text-white">Sign Out</button></span>
                 : 
                <span className="flex gap-1 items-center">
                    <img className="w-10 md:w-12 rounded-full" src={userImg} alt="img" />
                    <Link to='/sign-in'><button className="btn font-bold btn-sm md:btn-md btn-success text-white">Sign In</button></Link>
                </span>
            }
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
