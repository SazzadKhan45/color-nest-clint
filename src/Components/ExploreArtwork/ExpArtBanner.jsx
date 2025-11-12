import { FaBehance, FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const ExpArtBanner = () => {
  return (
    <div className="mb-10 px-2 md:px-0">
      <div
        className="rounded-lg bg-cover bg-center h-80 md:h-[400px] lg:h-[500px] flex justify-center items-center"
        style={{
          backgroundImage: "url('https://i.ibb.co/pBkzfmNy/art-banner.jpg')",
        }}
      >
        <div className="md:-ml-72 lg:-ml-[650px] flex flex-col items-center mt-4">
          <h3 className="text-xl text-white">EXPLORE OUR</h3>
          <h1 className="text-4xl font-bold py-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Creativity
          </h1>

          <p className="text-white">Creativity in art expresses imagination.</p>
          <p className="text-white">Thoughts into unique works.</p>
          <button className="btn  my-4">Read More</button>
          {/* Social icons */}
          <div>
            <div className="flex gap-3 cursor-pointer mt-4 text-black">
              {/*  */}
              <Link
                className="bg-amber-50 p-1 rounded-full"
                to="https://www.facebook.com/"
                target="_blank"
              >
                <FaFacebookF size={15} />
              </Link>
              <Link
                className="bg-amber-50 p-1 rounded-full"
                to="https://www.instagram.com/"
                target="_blank"
              >
                <FaInstagram size={15} />
              </Link>
              <Link
                className="bg-amber-50 p-1 rounded-full"
                to="https://x.com/home"
                target="_blank"
              >
                <FaXTwitter size={15} />
              </Link>
              <Link
                className="bg-amber-50 p-1 rounded-full"
                to="https://www.facebook.com/"
                target="_blank"
              >
                <FaBehance size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpArtBanner;
