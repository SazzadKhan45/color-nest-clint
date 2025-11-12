import { use } from "react";
import MyContainer from "../MyContainer";
import ArtWorksCard from "../ArtWorksCard/ArtWorksCard";
import { Link } from "react-router";

const ArtWorks = ({ promiseArtworks }) => {
  const artWorks = use(promiseArtworks);

  return (
    <div className="">
      <MyContainer>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2 md:px-0 mt-10">
          {artWorks.map((art) => (
            <ArtWorksCard key={art._id} art={art} />
          ))}
        </div>
        <h2 className="text-center pt-10">
          <Link to="/explore-Artworks" className="btn text-[16px] md:px-8">
            Show All Arts
          </Link>
        </h2>
      </MyContainer>
    </div>
  );
};

export default ArtWorks;
