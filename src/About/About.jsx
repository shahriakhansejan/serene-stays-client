const About = () => {
  return (
    <div className="container mx-auto p-6">

      <header className="text-center py-8">
        <h1 className="text-5xl font-bold text-gray-800 styleText">About Serene Stays</h1>
        <p className="mt-2 text-gray-600">Your gateway to peaceful and luxurious stays.</p>
      </header>

      <section className="bg-white shadow-md rounded-lg p-8 mt-6">
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Our Story</h2>
        <p className="text-gray-600 leading-relaxed">
          At Serene Stays, we believe in creating exceptional experiences for our guests. Located in the heart of Dhaka, our hotel is a haven of comfort, luxury, and tranquility. Whether you're here for business or leisure, Serene Stays offers a peaceful retreat from the hustle and bustle of the city.
        </p>

        <p className="text-gray-600 leading-relaxed mt-4">
          We pride ourselves on providing personalized services, modern amenities, and a warm, welcoming atmosphere. Our team is dedicated to ensuring that your stay is not just comfortable but memorable.
        </p>

        <p className="text-gray-600 leading-relaxed mt-4">
          Our mission is to offer our guests a home away from home, where they can relax, rejuvenate, and enjoy the best of what Dhaka has to offer.
        </p>
      </section>

      <section className="bg-white shadow-md rounded-lg p-8 mt-6">
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Where to Find Us</h2>
        <p className="text-gray-600 leading-relaxed">
          <strong>Address:</strong> Road-32, Mohakhali DOHS, Dhaka-1212
        </p>
        <p className="text-gray-600 leading-relaxed mt-2">
          <strong>Email:</strong> info@serenestays.com
        </p>
        <p className="text-gray-600 leading-relaxed mt-2">
          <strong>Phone:</strong> +880 1234 567 890
        </p>
      </section>
    </div>
  );
};

export default About;
