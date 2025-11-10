import MyContainer from "../MyContainer";
import { ThemeContext } from "../../Providers/ThemeContext";
import { useContext } from "react";
import Marquee from "react-fast-marquee";

// Example artist data
const artists = [
  { id: 1, name: "Artist One", image: "https://i.ibb.co/Lh6BFRS0/man.jpg" },
  { id: 2, name: "Artist Two", image: "https://i.ibb.co/Lz0DhxPS/woman.jpg" },
  {
    id: 3,
    name: "Artist Three",
    image: "https://i.ibb.co/vCWzMm0f/painter-5.jpg",
  },
  {
    id: 4,
    name: "Artist Four",
    image: "https://i.ibb.co/Cs7qkWS7/painter-3.jpg",
  },
  {
    id: 5,
    name: "Artist Five",
    image: "https://i.ibb.co/b5L6PN4X/painter-1.jpg",
  },
  {
    id: 5,
    name: "Artist Five",
    image: "https://i.ibb.co.com/5Wy4mcPp/painter-4.jpg",
  },
  {
    id: 5,
    name: "Artist Five",
    image: "https://i.ibb.co.com/gbTDrWSV/painter-6.jpg",
  },
  {
    id: 5,
    name: "Artist Five",
    image: "https://i.ibb.co.com/JjWvCmHF/painter-2.jpg",
  },
];

const TopArtists = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className="py-8">
      <MyContainer>
        <h2 className="text-lg md:text-3xl text-center font-medium mb-6">
          Top Artists of the Week
        </h2>
        <p className="mb-10 text-justify text-gray-500">
          Discover the hottest talent with our Top Artists of the Week! From
          rising stars to established favorites, this curated list showcases the
          musicians making waves across genres. Explore their unique styles,
          trending tracks, and artistic journeys, and stay ahead of the music
          scene with the artists everyone is talking about.
        </p>

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
            </div>
          ))}
        </Marquee>
      </MyContainer>
    </div>
  );
};

export default TopArtists;
