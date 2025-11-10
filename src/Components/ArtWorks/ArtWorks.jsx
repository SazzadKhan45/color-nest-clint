import { use } from "react";
import MyContainer from "../MyContainer";
import ArtWorksCard from "../ArtWorksCard/ArtWorksCard";

const ArtWorks = ({ promiseArtworks }) => {
  const artWorks = use(promiseArtworks);

  return (
    <div>
      <MyContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2 md:px-0 mt-10">
          {artWorks.map((art) => (
            <ArtWorksCard key={art._id} art={art} />
          ))}
        </div>
        <h2 className="text-center py-10">
          <button className="btn">Show All Arts</button>
        </h2>
      </MyContainer>
    </div>
  );
};

export default ArtWorks;
