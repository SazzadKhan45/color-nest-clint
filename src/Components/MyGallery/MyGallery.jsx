import { use, useEffect, useState } from "react";
import MyContainer from "../MyContainer";
import { AuthContext } from "./../../Providers/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { ThemeContext } from "./../../Providers/ThemeContext";
import GalleyBanner from "./GalleyBanner";
import { Link } from "react-router";

const MyGallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Context info
  const { user } = use(AuthContext);
  const { isDark } = use(ThemeContext);
  //
  useEffect(() => {
    fetch(`http://localhost:3000/gallery/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setGalleryData(data);
        setLoading(false);
      });
  }, [user?.email]);

  // Handle delete add gallery
  const handleAddGalleryRemove = (id) => {
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
          .delete(`http://localhost:3000/add-gallery/${id}`)
          .then(() => {
            // console.log(res.data);

            const newGalleryData = galleryData.filter(
              (gallery) => gallery._id !== id
            );
            setGalleryData(newGalleryData);

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

  //
  return (
    <div
      className={`px-2 md:px-0 pt-4 md:pt-10 min-h-screen ${
        isDark ? "bg-gray-800" : "bg-gray-300"
      }`}
    >
      <title>My Gallery</title>
      <MyContainer>
        <GalleyBanner />

        <div
          className={`rounded px-2 md:px-0 ${
            isDark ? "bg-gray-900" : "bg-gray-200"
          }`}
        >
          {galleryData && galleryData.length > 0 ? (
            loading ? (
              <p className="text-center my-40 text-5xl">
                <span className="loading loading-bars loading-xl text-green-600"></span>
              </p>
            ) : (
              <div className="">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mt-10 pt-4">
                  My Gallery{" "}
                  <samp className="text-xl text-gray-600">
                    ({galleryData.length})
                  </samp>
                </h1>
                <p className="text-gray-500 text-justify md:text-center mt-1 mb-10 pb-4">
                  A vibrant collection showcasing creativity, colors, and
                  emotions, capturing moments that inspire and tell stories.
                </p>
              </div>
            )
          ) : (
            <div className="">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mt-10 pt-4">
                Upload Your Best Art
              </h1>
              <p className="text-gray-500 text-justify md:text-center mt-1 pb-4">
                Showcase your most creative artwork! Share your unique vision,
                style, and passion with the world through your best art.
              </p>
              <h2 className="text-center">
                <Link to="/add-Artwork" className="btn btn-secondary mb-6">
                  Upload Art
                </Link>
              </h2>
            </div>
          )}
        </div>
        {/* Show all gallery data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
          {galleryData.map((data) => (
            <div key={data._id}>
              <div className="card bg-base-100 shadow-sm">
                <figure className="px-8 pt-8">
                  <img
                    src={data?.artImage}
                    alt={data?.title}
                    className="rounded-lg h-[200px] lg:h-[350px] w-full"
                  />
                </figure>
                <div className="card-body">
                  <div>
                    <h2 className="card-title">{data?.title}</h2>
                    <p className="mt-1 text-gray-500">
                      Post-Date : {data?.postedAt}
                    </p>
                  </div>
                  <div className="divider divider-neutral"></div>
                  <div className="flex  items-center gap-3">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={data?.painterImage}
                      alt={data.name}
                    />
                    <div>
                      <h4 className="text-lg font-medium">
                        {data.painterName}
                      </h4>
                      <p className="text-gray-500">{data.email}</p>
                    </div>
                  </div>

                  {/* Remove gallery */}
                  <div className="flex justify-between items-center mt-4">
                    <Link to="/add-Artwork" className="btn btn-success">
                      Add More Art
                    </Link>
                    <button
                      onClick={() => handleAddGalleryRemove(data?._id)}
                      className="btn btn-secondary"
                    >
                      Remove Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MyContainer>
    </div>
  );
};

export default MyGallery;
