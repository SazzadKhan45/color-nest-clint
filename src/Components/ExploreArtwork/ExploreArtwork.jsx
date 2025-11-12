import { use, useState } from "react";
import { useLoaderData } from "react-router";
import MyContainer from "../MyContainer";
import ArtWorksCard from "../ArtWorksCard/ArtWorksCard";
import { ThemeContext } from "../../Providers/ThemeContext";
import ExpArtBanner from "./ExpArtBanner";

const ExploreArtwork = () => {
  //
  const { isDark } = use(ThemeContext);

  //
  const exploreArtWorks = useLoaderData(); // loads 20 artworks
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 12;

  // Filter artworks based on title
  const filteredArtworks = exploreArtWorks.filter((art) =>
    art.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);

  // Slice filtered data for current page
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
        <div>
          <ExpArtBanner />
        </div>
        <div
          className={`md:flex justify-between items-center mb-6 shadow-sm px-2 py-3 rounded ${
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

        {/* Artwork Cards */}
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((art) => (
              <ArtWorksCard key={art._id} art={art} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No artworks found for “{searchTerm}”.
          </p>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-2">
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
