import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='text-center mt-16'>
            <h1 className='text-5xl text-red-500 font-bold'>Ooops!!</h1>
            <p className='text-xl font-semibold text-[#323232] my-12'>Page not Found</p>
            <Link to='/'><button className='btn btn-success'>Back to Home</button></Link>

        </div>
    );
};

ErrorPage.propTypes = {
    
};

export default ErrorPage;