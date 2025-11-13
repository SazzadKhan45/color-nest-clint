import { Link } from "react-router";

const GalleyBanner = () => {
  return (
    <div
      className="w-full h-60 md:h-80 lg:h-[450px] bg-cover bg-center  rounded-lg"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/qY8mWF5z/Add-Gallery-bg.jpg')",
      }}
    >
      {/* Optional: add content over banner */}
      <div className="ml-2 pt-12 md:ml-6 lg:ml-20 md:pt-20 lg:pt-24 text-black">
        <p className="font-medium text-sm md:text-lg">ART IS MY PASSION</p>
        <h1 className="text-xl md:text-4xl font-bold py-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          My Gallery
        </h1>
        <p className="text-sm md:text-[15px]">
          Explore my collection of artworks.
        </p>
        <p className="text-sm md:text-[15px]">
          showcasing creativity, color, and emotion..
        </p>
      </div>
      <Link to="/explore-Artworks" className="btn mt-4 ml-2 md:ml-6 lg:ml-20">
        Explore More Art
      </Link>
    </div>
  );
};

export default GalleyBanner;
