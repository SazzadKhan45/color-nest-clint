import { use, useEffect, useState } from "react";
import { ThemeContext } from "../../Providers/ThemeContext";
import { BiSolidLike } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "./../../Providers/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const ArtWorksCard = ({ art }) => {
  // All state
  const [like, setLike] = useState(art.likeCount || 0);

  // All context
  const { isDark } = use(ThemeContext);
  const { user } = use(AuthContext);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  //
  const {
    _id,
    artImage,
    title,
    description,
    painterImage,
    painterName,
    category,
    likeCount,
  } = art;

  // Post favorite art to database
  const handleFavoritesDataPostDatabase = () => {
    const favoritesDataInfo = {
      artId: _id,
      name: painterName,
      email: user?.email,
      artTitle: title,
      artCategory: category,
      image: artImage,
      details: description,
    };

    axios
      .post("http://localhost:3000/myFavorites", favoritesDataInfo)
      .then(() => {
        toast.success("Art successfully added to My Favorites");
      })
      .catch((error) => {
        console.error("Error adding favorite:", error);
        toast.error(error.message);
      });
  };

  // Like handler
  const handleArtLikeCount = (id, email) => {
    axios
      .patch(`http://localhost:3000/artData/like/${id}`, { email })
      .then(() => {
        setLike((prev) => prev + 1);
        toast.success("Liked");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //
  return (
    <div
      className={`card shadow-sm ${isDark ? "bg-gray-700" : "bg-base-100"}`}
      data-aos="zoom-in"
      data-aos-delay="100"
      data-aos-once="true"
    >
      <figure className="px-6 pt-6 h-[250px] md:h-[300px] lg:h-[400px]">
        <img
          src={artImage}
          alt={title}
          className="rounded-xl h-full w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title md:text-lg lg:text-xl">{title}</h2>
        <p className="text-justify">{description}</p>

        <div className="flex justify-between items-center my-2">
          <div className="flex items-center gap-2">
            <img
              className="h-12 w-12 rounded-full object-cover border-2 border-orange-600"
              src={painterImage}
              alt={painterName}
            />
            <h3 className="text-[16px] font-medium">{painterName}</h3>
          </div>
          <button className="bg-orange-50 text-black py-0.5 rounded-lg px-2 cursor-pointer hover:bg-gray-200 duration-500">
            {category}
          </button>
        </div>

        <div className="divider divider-neutral"></div>

        {/* Like / Heart / Details */}
        <div className="card-actions flex justify-between items-center">
          <div className="flex gap-4">
            {/* Like Button */}
            {user ? (
              <div className="btn">
                <button
                  onClick={() => handleArtLikeCount(art._id, user.email)}
                  className="flex items-center gap-3"
                >
                  <BiSolidLike size={25} className="cursor-pointer" /> {like}
                </button>
              </div>
            ) : (
              <Link
                to="/register"
                state={{ from: location.pathname }}
                className="btn"
              >
                <BiSolidLike size={20} /> {likeCount}
              </Link>
            )}

            {/* Heart Button */}
            {user ? (
              <button
                onClick={() => handleFavoritesDataPostDatabase(_id)}
                className="btn btn-circle text-red-500"
              >
                <FaHeart size={20} />
              </button>
            ) : (
              <Link
                to="/register"
                state={{ from: location.pathname }}
                className="btn btn-circle"
              >
                <FaHeart size={20} />
              </Link>
            )}
          </div>

          {/* Art Details */}
          {user ? (
            <Link
              to={`/artWorks-details/${_id}`}
              className="btn btn-outline btn-secondary"
            >
              Art Details
            </Link>
          ) : (
            <Link
              to="/register"
              state={{ from: location.pathname }}
              className="btn btn-outline btn-secondary"
            >
              Art Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtWorksCard;
