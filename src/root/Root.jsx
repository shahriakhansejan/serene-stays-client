import { Outlet } from "react-router-dom";
import Navbar from "../Pages/HomeElement/Navbar/Navbar";
import Footer from "../Pages/Footer/Footer";


const Root = () => {
    return (
        <div>
             <Navbar></Navbar>
            <div className="container mx-auto">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

Root.propTypes = {
    
};

export default Root;