import { use, useEffect, useState } from "react";
import MyContainer from "../MyContainer";
import GalleyBanner from "../GalleyBanner/GalleyBanner";
import { AuthContext } from "./../../Providers/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const MyGallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Auth info
  const { user } = use(AuthContext);
  //
  useEffect(() => {
    fetch(`http://localhost:3000/add-gallery?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
          .then((res) => {
            console.log(res.data);

            const newGalleryData = galleryData.filter(
              (gallery) => gallery.id !== id
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
    <div className="px-2 md:px-0 bg-gray-300 pt-4 md:pt-10 min-h-screen">
      <MyContainer>
        <GalleyBanner />

        {loading ? (
          <p className="text-center text-lg font-medium text-gray-600">
            Loading...
          </p>
        ) : (
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mt-10">
              My Gallery ({galleryData.length})
            </h1>
            <p className="text-justify md:text-center mt-1 mb-10">
              A vibrant collection showcasing creativity, colors, and emotions,
              capturing moments that inspire and tell stories.
            </p>
          </div>
        )}
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
                    <p className="mt-1">Date : {data?.date}</p>
                  </div>
                  <div className="divider divider-neutral"></div>
                  <div className="flex  items-center gap-3">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={data?.image}
                      alt={data.name}
                    />
                    <div>
                      <h4 className="text-lg font-medium">{data.name}</h4>
                      <p className="text-gray-500">{data.userEmail}</p>
                    </div>
                  </div>

                  {/* Remove gallery */}
                  <button
                    onClick={() => handleAddGalleryRemove(data?.id)}
                    className="btn btn-secondary"
                  >
                    Remove Now
                  </button>
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
