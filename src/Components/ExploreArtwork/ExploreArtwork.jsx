import { use, useState, useEffect } from "react";
import MyContainer from "../MyContainer";
import ArtWorksCard from "../ArtWorksCard/ArtWorksCard";
import { ThemeContext } from "../../Providers/ThemeContext";
import ExpArtBanner from "./ExpArtBanner";
import AOS from "aos";
import "aos/dist/aos.css";

const ExploreArtwork = () => {
  //
  const [exploreArtWorks, setExploreArtWorks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  //
  const { isDark } = use(ThemeContext);

  //
  useEffect(() => {
    fetch("http://localhost:3000/explore-art")
      .then((res) => res.json())
      .then((data) => {
        setExploreArtWorks(data);
        setLoading(false);
      });
  }, []);

  const itemsPerPage = 12;

  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  // Filter artworks by title
  const filteredArtworks = exploreArtWorks.filter((art) =>
    art.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredArtworks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to page 1 when search changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className={`py-8 ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
      <MyContainer>
        <title>Explore Artworks</title>

        {/* Banner (no AOS animation here) */}
        <ExpArtBanner />

        {/* Search and header */}
        <div
          data-aos="fade-right"
          className={`md:flex justify-between items-center mb-10 shadow-sm px-2 py-3 rounded ${
            isDark ? "bg-gray-800" : "bg-base-100"
          }`}
        >
          <h2 className="text-2xl font-bold">
            Explore Artworks{" "}
            <span className="md:text-xl">({filteredArtworks.length})</span>
          </h2>

          {/* Live Search Input */}
          <label className="input flex items-center gap-2 border px-2 rounded">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search artworks..."
              className="outline-none bg-transparent"
            />
          </label>
        </div>

        {/* Artwork Grid */}
        {loading ? (
          <p className="text-center my-10 text-green-600">
            <span className="loading loading-bars loading-xl"></span>
          </p>
        ) : currentItems.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-aos="fade-up"
          >
            {currentItems.map((art, index) => (
              <div
                key={art._id}
                data-aos="zoom-in"
                data-aos-delay={index * 50} // staggered animation
              >
                <ArtWorksCard art={art} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10" data-aos="fade-in">
            No artworks found for “{searchTerm}”.
          </p>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div
            data-aos="fade-up"
            className="flex justify-center items-center mt-8 gap-2"
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 text-black rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-black bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </MyContainer>
    </div>
  );
};

export default ExploreArtwork;
