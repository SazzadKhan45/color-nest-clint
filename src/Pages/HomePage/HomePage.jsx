import { Suspense, use } from "react";
import ArtWorks from "../../Components/ArtWorks/ArtWorks";
import HeroSlider from "../../Components/HeroSlider/HeroSlider";
import MyContainer from "../../Components/MyContainer";
import { ThemeContext } from "../../Providers/ThemeContext";

const promiseArtworks = fetch("http://localhost:3000/homepage-art").then(
  (res) => res.json()
);

const HomePage = () => {
  const { isDark } = use(ThemeContext);

  return (
    <div
      className={`pt-12 ${
        isDark
          ? ""
          : "bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 text-gray-900"
      }`}
    >
      <MyContainer>
        <header>
          <HeroSlider />
        </header>
        <main>
          <div className="mt-10">
            <h2 className="text-3xl text-center font-medium">
              Most Resent Arts
            </h2>
            <Suspense
              fallback={
                <div className="text-center">
                  <span className="loading loading-spinner text-success"></span>
                </div>
              }
            >
              <ArtWorks promiseArtworks={promiseArtworks} />
            </Suspense>
          </div>
        </main>
      </MyContainer>
    </div>
  );
};

export default HomePage;
