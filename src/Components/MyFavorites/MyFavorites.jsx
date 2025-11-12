import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthContext";
import MyContainer from "../MyContainer";
import { ThemeContext } from "../../Providers/ThemeContext";
import axios from "axios";
import Swal from "sweetalert2";

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Auth context
  const { user } = use(AuthContext);
  const { isDark } = use(ThemeContext);

  //
  useEffect(() => {
    fetch(`http://localhost:3000/myFavorites?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data);
        setLoading(false);
      });
  }, [user?.email]);

  // Remove My Favorites art function
  const handleMyFavoritesArt = (id) => {
    //
    console.log(id);
    //
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Make DELETE request only if confirmed
        axios
          .delete(`http://localhost:3000/myFavorites/${id}`)
          .then(() => {
            //
            const Favorites = favorites.filter((art) => art.artId !== id);

            setFavorites(Favorites);

            // Show success alert after deletion
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error(error.message);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div>
      <title>My Favorites Arts</title>
      {loading ? (
        <p className="text-center my-40 text-5xl">
          <span className="loading loading-bars loading-xl text-green-600"></span>
        </p>
      ) : (
        <MyContainer>
          <div
            className={`rounded px-2 md:px-0 my-10 py-4 ${
              isDark ? "bg-gray-900" : "bg-gray-200"
            }`}
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-center">
              My Favorites Art
              <span className="text-lg text-gray-500">
                ({favorites.length})
              </span>
            </h2>
            <p className="text-gray-500 text-justify md:text-center">
              My Favorites Art showcases the artworks I love most — unique
              paintings and creative masterpieces carefully selected for their
              beauty, emotion, and inspiration, reflecting my personal taste and
              artistic admiration.
            </p>
          </div>

          {/* Favorites art data load */}
          <div>
            {favorites.map((art) => (
              <div className="" key={art._id}>
                <div
                  className={`md:flex gap-4 justify-between items-center bg-amber-200 p-4 rounded  my-10 py-4 shadow ${
                    isDark ? "bg-gray-900" : "bg-gray-200"
                  }`}
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-full md:w-[50%]">
                      <img
                        className="h-32 w-32 rounded-lg"
                        src={art?.image}
                        alt={art?.title}
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">
                        Name : {art?.name}
                      </h4>
                      <p className="font-medium">
                        Category :{" "}
                        <span className="text-gray-500">
                          {art?.artCategory}
                        </span>
                      </p>
                      <p className="text-gray-500 text-justify">
                        {art?.details}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-[50%]">
                    <h2 className=" mt-4 md:mt-0 text-right">
                      <button
                        onClick={() => handleMyFavoritesArt(art?.artId)}
                        className="btn btn-secondary"
                      >
                        Remove Art
                      </button>
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MyContainer>
      )}
    </div>
  );
};

export default MyFavorites;
