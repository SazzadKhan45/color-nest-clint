import { use, useEffect, useState } from "react";
import MyContainer from "../MyContainer";
import GalleyBanner from "../GalleyBanner/GalleyBanner";
import { AuthContext } from "./../../Providers/AuthContext";

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

  return (
    <div className="px-2 md:px-0 bg-gray-300 pt-4 md:pt-10 min-h-screen">
      <MyContainer>
        <GalleyBanner />

        {loading ? (
          <p className="text-center text-lg font-medium text-gray-600">
            Loading...
          </p>
        ) : (
          <h1 className="text-2xl md:text-3xl font-bold text-center my-4">
            My Gallery ({galleryData.length})
          </h1>
        )}

        {/* ✅ Responsive Table Wrapper */}
        <div className="mt-8 overflow-x-auto bg-amber-100 py-4 border border-gray-400 rounded-xl shadow-md mb-10">
          <table className="table w-full text-sm md:text-base">
            {/* Table Head */}
            <thead>
              <tr className="text-gray-800 text-sm md:text-lg font-semibold bg-amber-200">
                <th className="p-3">No</th>
                <th className="p-3">Art Gallery</th>
                <th className="p-3">User Info</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {galleryData.map((art, index) => (
                <tr
                  key={art._id}
                  className="hover:bg-amber-50 transition-all border-b border-gray-300"
                >
                  <th className="whitespace-nowrap p-3">{index + 1}</th>

                  {/* Art Gallery Column */}
                  <td className="min-w-[250px] p-3">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                      <div className="avatar">
                        <div className="h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-xl overflow-hidden">
                          <img
                            src={art?.artImage}
                            alt="Art"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="text-center sm:text-left">
                        <div className="text-base md:text-lg font-semibold">
                          {art?.title}
                        </div>
                        <div className="text-sm text-gray-500">{art?.date}</div>
                      </div>
                    </div>
                  </td>

                  {/* User Info Column */}
                  <td className="min-w-[200px] p-3">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                      <div className="avatar">
                        <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden">
                          <img
                            src={art?.image}
                            alt={art?.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="text-center sm:text-left">
                        <div className="text-base md:text-lg font-semibold">
                          {art?.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {art?.userEmail}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/*  Action Column */}
                  <td className="p-3 text-center">
                    <button className="btn btn-sm md:btn-md bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MyContainer>
    </div>
  );
};

export default MyGallery;
