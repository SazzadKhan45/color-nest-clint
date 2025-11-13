import MyContainer from "../MyContainer";
import { ThemeContext } from "../../Providers/ThemeContext";
import { useContext } from "react";
import Marquee from "react-fast-marquee";

// Example artist data
const artists = [
  {
    id: 1,
    name: "Safa Khan",
    image: "https://i.ibb.co.com/gbTDrWSV/painter-6.jpg",
  },

  { id: 2, name: "Oscar Rivera", image: "https://i.ibb.co/Lz0DhxPS/woman.jpg" },
  {
    id: 3,
    name: "Ella Stone",
    image: "https://i.ibb.co/vCWzMm0f/painter-5.jpg",
  },
  {
    id: 4,
    name: "Liam Anderson",
    image: "https://i.ibb.co/Cs7qkWS7/painter-3.jpg",
  },
  {
    id: 5,
    name: "Aaron Miller",
    image: "https://i.ibb.co/b5L6PN4X/painter-1.jpg",
  },
  {
    id: 6,
    name: "Emily Harper",
    image: "https://i.ibb.co.com/5Wy4mcPp/painter-4.jpg",
  },
  { id: 7, name: "Nora Mitchell", image: "https://i.ibb.co/Lh6BFRS0/man.jpg" },

  {
    id: 8,
    name: "Micwl Mx",
    image: "https://i.ibb.co.com/JjWvCmHF/painter-2.jpg",
  },
];

const TopArtists = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className="py-8 px-2 md:px-0">
      <MyContainer>
        <div
          className={`mb-10 shadow-sm px-2 py-3 rounded ${
            isDark ? "bg-gray-800" : "bg-base-100"
          }`}
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl text-center font-medium my-4">
            Top Artists of the Week
          </h2>
          <p
            className={`text-justify md:text-center mb-4 md:mb-6 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Discover the hottest talent with our Top Artists of the Week! From
            rising stars to established favorites, this curated list showcases
            the musicians making waves across genres. Explore their unique
            styles, trending tracks, and artistic journeys, and stay ahead of
            the music scene with the artists everyone is talking about.
          </p>
        </div>

        <Marquee gradient={false} speed={50} pauseOnHover>
          {artists.map((artist) => (
            <div
              key={artist.id}
              className={`flex flex-col items-center shadow-md p-4 rounded-lg mx-4 ${
                isDark ? "bg-gray-700" : "bg-white"
              }`}
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
              />
              <p className="mt-2 font-medium text-center">{artist.name}</p>
              <p className="mt-2 text-center">Top : {artist.id}</p>
            </div>
          ))}
        </Marquee>
      </MyContainer>
    </div>
  );
};

export default TopArtists;
