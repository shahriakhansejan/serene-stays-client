import React from 'react';
import useAuth from './../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();
    const location = useLocation();

    if(loading){
        return <progress className="progress w-full"></progress>
    }

    if(user?.email){
        return children;
    }
    return <Navigate state={location?.pathname} to='/sign-in' replace></Navigate>
    
};


export default PrivateRoute;