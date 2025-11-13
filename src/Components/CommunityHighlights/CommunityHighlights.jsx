import React, { useEffect, use } from "react";
import MyContainer from "../MyContainer";
import { ThemeContext } from "../../Providers/ThemeContext";
import { AuthContext } from "../../Providers/AuthContext";
import { BiSolidLike } from "react-icons/bi";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

const highlights = [
  {
    id: 1,
    title: "Digital Art Showcase 2025",
    description:
      "A stunning collection of digital masterpieces from emerging artists worldwide.",
    image: "https://i.ibb.co/dsYBKSqN/Digital-Art-Showcase.webp",
  },
  {
    id: 2,
    title: "Watercolor Wonders",
    description:
      "Explore vibrant watercolor paintings capturing the essence of nature.",
    image: "https://i.ibb.co/gMG2LRh9/watercolor-artist.jpg",
  },
  {
    id: 3,
    title: "Street Art Revolution",
    description:
      "A tribute to graffiti and street artists transforming urban landscapes.",
    image: "https://i.ibb.co/qY0Jtnxm/Street-Art-Revolution.jpg",
  },
  {
    id: 4,
    title: "Abstract Expressions",
    description:
      "Dive into abstract art where colors and forms evoke deep imagination.",
    image: "https://i.ibb.co/tTPZPZDH/Abstract-Expressions.jpg",
  },
  {
    id: 5,
    title: "Sculpture Stories",
    description:
      "Modern sculptors redefining form, balance, and creativity through their works.",
    image: "https://i.ibb.co/5gG8Bygs/Sculpture-Stories.jpg",
  },
  {
    id: 6,
    title: "Portrait Masters",
    description:
      "Meet portrait artists who bring human emotions to life with every brushstroke.",
    image: "https://i.ibb.co/cSZPCT0G/Portrait-Masters.jpg",
  },
];

const CommunityHighlights = () => {
  const { isDark } = use(ThemeContext);
  const { user } = use(AuthContext);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="py-10 px-2 md:px-0">
      <MyContainer>
        <div
          className={`mb-10 shadow-sm px-2 py-3 rounded ${
            isDark ? "bg-gray-800" : "bg-base-100"
          }`}
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl text-center font-medium my-4">
            Community Highlights
          </h2>
          <p
            className={`text-justify md:text-center mb-4 md:mb-6 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Discover the hottest talent with our Top Artists of the Week! From
            rising stars to established favorites, this curated list showcases
            the artists making waves across styles. Explore their unique
            creations and get inspired by their journeys.
          </p>
        </div>

        {/* Cards with AOS animation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <div
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className={`flex flex-col items-center shadow-md p-4 rounded-lg transition-transform hover:-translate-y-1 hover:shadow-xl  ${
                isDark ? "bg-gray-700" : "bg-white"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-52 object-cover rounded-xl"
              />
              <div className="mt-4 ml-3">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p
                  className={`text-justify ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {item.description}
                </p>
              </div>
              <div className="py-4">
                {user ? (
                  <button className="btn flex items-center">
                    <BiSolidLike size={20} className="mr-1" /> 25
                  </button>
                ) : (
                  <Link
                    to="/register"
                    state={{ from: location.pathname }}
                    className="btn flex items-center"
                  >
                    <BiSolidLike size={20} className="mr-1" /> 20
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </MyContainer>
    </div>
  );
};

export default CommunityHighlights;
