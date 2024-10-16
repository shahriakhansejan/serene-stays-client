import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


const Banner = ({ index, roomData, roomsData }) => {
    const { image, title } = roomData;
    const length = roomsData.length;

    const previous = index === 0 ? `#slide${length}` : `#slide${index}`
    const next = length - 1 === index ? '#slide1' : `#slide${index + 2}`

    const ids = `slide${index + 1}`

    return (
        <div id={ids} className="carousel-item min-h-svh relative w-full">
            <img
                src={image}
                className="w-full rounded bg-gradient-to-r" />

            <div className="absolute inset-0 h-full w-full bg-cover bg-gradient-to-r from-black/75 to-black/25">
                <div className=" md:ml-20 absolute top-1/4 md:top-1/3 styleText text-center">
            <h1 className="text-5xl md:text-8xl text-pink-100 font-extrabold" >{title}</h1>
            <p className="text-2xl mt-5 text-white font-semibold w-2/3 mx-auto">CozyStay provides you with WYSIWYG interactive design tools and numerous customization options to help you easily build the website of your dreams.</p>
                </div>
            </div>

            <div className="absolute flex gap-5 right-10 bottom-0 -translate-y-1/2 transform">
                <a href={previous} className="btn btn-outline border-2 hover:bg-orange-500 hover:border-orange-500 rounded-full text-white hover:text-white"><FaArrowLeft /></a>
                <a href={next} className="btn btn-outline border-2 hover:bg-green-600 hover:border-green-600 rounded-full text-white hover:text-white"><FaArrowRight /></a>
            </div>
        </div>
    );
};

Banner.propTypes = {

};

export default Banner;