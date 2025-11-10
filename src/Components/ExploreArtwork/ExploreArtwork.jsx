import React, { useState } from "react";
import { useLoaderData } from "react-router";
import MyContainer from "../MyContainer";
import ArtWorksCard from "../ArtWorksCard/ArtWorksCard";

const ExploreArtwork = () => {
  const exploreArtWorks = useLoaderData(); // loads 20 artworks
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(exploreArtWorks.length / itemsPerPage);

  // Slice data for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = exploreArtWorks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="py-8">
      <MyContainer>
        <h2 className="text-2xl font-bold mb-6">Explore Artworks</h2>

        {/* Artwork Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((art) => (
            <ArtWorksCard key={art._id} art={art} />
          ))}
        </div>

        {/* Pagination Controls */}
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
                  ? "bg-blue-500 "
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
      </MyContainer>
    </div>
  );
};

export default ExploreArtwork;
