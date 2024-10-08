import axios from "axios";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://serene-stays-server.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
    const {logOut} = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
            logOut()
              .then(() => {
                navigate("/sign-in");
              })
              .catch();
        }
      }
    );
  }, []);

  return axiosSecure;
};

useAxiosSecure.propTypes = {};

export default useAxiosSecure;
