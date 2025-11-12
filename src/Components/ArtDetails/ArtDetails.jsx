import { useLoaderData, useNavigate } from "react-router";
import MyContainer from "../MyContainer";
import { use } from "react";
import { ThemeContext } from "../../Providers/ThemeContext";
import { AuthContext } from "../../Providers/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const ArtDetails = () => {
  // Theme context
  const { isDark } = use(ThemeContext);
  //   Auth context
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  //
  const singleArt = useLoaderData();
  const {
    title,
    artImage,
    painterImage,
    painterName,
    category,
    downloadCount,
    likeCount,
    postedAt,
    description,
    email,
    _id,
  } = singleArt;

  // Add Gallery function
  const handleAddGallery = () => {
    //
    const addGalleryInfo = {
      id: _id,
      name: user?.displayName,
      userEmail: user?.email,
      image: user?.photoURL,
      artImage: artImage,
      title: title,
      date: postedAt,
    };

    axios
      .post("http://localhost:3000/add-gallery", addGalleryInfo)
      .then(() => {
        toast.success("Gallery Added Successfully");
        console.log({ addGalleryInfo });
        navigate("/my-Gallery");
      })
      .catch((error) => {
        console.error("Error adding gallery:", error);
      });
  };

  return (
    <div className={`py-10 px-2 md:px-0  ${isDark ? "" : "bg-gray-100"}`}>
      <title>Art Details</title>
      <MyContainer>
        <div
          className={`max-w-4xl mx-auto shadow-lg rounded-xl overflow-hidden p-4 md:p-10 ${
            isDark ? "dark:bg-gray-800" : "bg-white text-black"
          }`}
        >
          {/* Artwork Image */}
          <img
            src={artImage}
            alt={title}
            className="w-full h-[250px] md:h-[400px] object-cover rounded-xl"
          />

          {/* Artwork Details */}
          <div className="p-6 space-y-4">
            <h2 className="text-xl md:text-2xl font-bold">{title}</h2>

            <div className="flex items-center gap-3">
              <img
                src={painterImage}
                alt={painterName}
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <h3 className="font-semibold text-lg ">{painterName}</h3>
                <p className="text-sm text-gray-500">{email}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm ">
              <p>
                <span className="font-semibold">Category:</span> {category}
              </p>
              <p>
                <span className="font-semibold">Likes:</span> {likeCount}
              </p>
              <p>
                <span className="font-semibold">Downloads:</span>{" "}
                {downloadCount}
              </p>
              <p>
                <span className="font-semibold">Posted:</span>{" "}
                {new Date(postedAt).toLocaleDateString()}
              </p>
            </div>

            <p className=" leading-relaxed">{description}</p>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAddGallery}
                className="btn btn-secondary cursor-pointer"
              >
                Add Gallery
              </button>
              {/* download */}
              <button
                className={`px-4 py-2 border border-orange-500 text-orange-500 rounded-lg   transition cursor-pointer ${
                  isDark ? "hover:text-white" : "hover:text-black"
                }`}
              >
                Download ⬇️
              </button>
            </div>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default ArtDetails;
