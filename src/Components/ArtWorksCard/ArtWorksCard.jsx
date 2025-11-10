import React, { use } from "react";
import { ThemeContext } from "../../Providers/ThemeContext";
import { BiSolidLike } from "react-icons/bi";
import { Link } from "react-router";

const ArtWorksCard = ({ art }) => {
  //
  const { isDark } = use(ThemeContext);
  //

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
  return (
    <div
      className={`card  w-96 lg:w-[500px] shadow-sm ${
        isDark ? "bg-gray-700" : "bg-base-100"
      }`}
    >
      <div className="">
        <figure className="px-6 pt-6 h-[250px] md:h-[300px] lg:h-[400px]">
          <img
            src={artImage}
            alt={title}
            className="rounded-xl h-full w-full"
          />
        </figure>
        <div className="card-body ">
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

          {/*  */}
          <div className=" card-actions flex justify-between items-center">
            <div className="flex gap-2">
              <button className="btn">
                <BiSolidLike size={20} /> {likeCount}
              </button>
              <button className="btn btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="size-[1.2em]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </button>
            </div>
            {/* Art Details  */}
            <Link
              to={`/artWorks-details/${_id}`}
              className="btn btn-outline btn-primary"
            >
              Art Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtWorksCard;
