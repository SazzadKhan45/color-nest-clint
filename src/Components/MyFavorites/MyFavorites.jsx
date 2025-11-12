import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthContext";
import MyContainer from "../MyContainer";
import { ThemeContext } from "../../Providers/ThemeContext";

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Auth context
  const { user } = use(AuthContext);
  const { isDark } = use(ThemeContext);

  useEffect(() => {
    fetch(`http://localhost:3000/myFavorites?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data);
        setLoading(false);
      });
  }, [user?.email]);
  return (
    <div>
      <title>My Favorites Arts</title>
      <MyContainer>
        <div
          className={`rounded px-2 md:px-0 my-10 py-4 ${
            isDark ? "bg-gray-900" : "bg-gray-200"
          }`}
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-center">
            My Favorites Art{" "}
            <span className="text-lg text-gray-500">({favorites.length})</span>
          </h2>
          <p className="text-gray-500 text-justify md:text-center">
            My Favorites Art showcases the artworks I love most — unique
            paintings and creative masterpieces carefully selected for their
            beauty, emotion, and inspiration, reflecting my personal taste and
            artistic admiration.
          </p>
        </div>

        {/* Favorites art data load */}
        <div c>
          {favorites.map((art) => (
            <div key={art._id}>
              <img src={art.image} alt="" />
            </div>
          ))}
        </div>
      </MyContainer>
    </div>
  );
};

export default MyFavorites;
