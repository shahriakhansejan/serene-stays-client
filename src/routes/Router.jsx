import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import ErrorPage from "../errorPage/ErrorPage";
import Home from "../Pages/HomeElement/Home/Home";
import Rooms from "../Pages/Card/Rooms";
import RoomDetails from "../Pages/Card/RoomDetails";
import SignIn from "../Pages/Register/SignIn/SignIn";
import SignUp from "../Pages/Register/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import BookingsCard from "../Pages/BookingsCard/BookingsCard";
import About from "../About/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/rooms",
        element: <Rooms></Rooms>,
      },
      {
        path: "/rooms/:id",
        element: <PrivateRoute><RoomDetails></RoomDetails></PrivateRoute>,
        loader: ({ params }) =>
          fetch(`https://serene-stays-server.vercel.app/rooms/${params.id}`),
      },
      {
        path: "/sign-in",
        element: <SignIn></SignIn>,
      },
      {
        path: '/sign-up',
        element: <SignUp></SignUp>
      },
      {
        path: '/bookings',
        element: <PrivateRoute><BookingsCard></BookingsCard></PrivateRoute>
      },
      {
        path: '/about',
        element: <About></About>
      }
      
    ],
  },
]);

export default router;
