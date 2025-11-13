import { use } from "react";
import MyContainer from "../MyContainer";
import { ThemeContext } from "../../Providers/ThemeContext";
import { AuthContext } from "../../Providers/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const AddArtwork = () => {
  // ThemContext
  const { isDark } = use(ThemeContext);
  // AuthContext
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Get value from input filed
    const painterName = user?.displayName || "Unknown";
    const email = user?.email || "no-email";
    const title = e.target.title.value;
    const artImage = e.target.artImage.value;
    const painterImage = user?.photoURL || "";
    const category = e.target.category.value;
    const postedAt = e.target.postedAt.value;
    const downloadCount = 0;
    const likeCount = 0;
    const description = e.target.description.value;
    //Art info
    const artInfo = {
      painterName,
      painterImage,
      email,
      title,
      category,
      artImage,
      postedAt,
      downloadCount,
      likeCount,
      description,
    };
    //Post art works
    axios
      .post("http://localhost:3000/explore-art", artInfo)
      .then((res) => {
        console.log(res.data);
        toast.success("Art works is successfully added");
        navigate("/my-Gallery");
        e.target.reset();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to connect to the server.");
      });
  };

  return (
    <div
      className={`py-10 min-h-screen px-2 md:px-0 ${
        isDark ? "bg-gray-600" : "bg-gray-100"
      }`}
    >
      <title>Add Artwork</title>
      <MyContainer>
        <div
          className={`px-2 md:px-0 py-4 mb-10 rounded-lg ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-center">
            Add New Artwork Info
          </h2>
          <p className="text-gray-500 text-justify md:text-center mt-1 px-1">
            Add details about your new artwork! Share its title, inspiration,
            medium, and story so viewers can fully appreciate your creativity
            and artistic vision.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`shadow-md rounded-2xl px-4 py-8 md:p-8 space-y-5 max-w-2xl mx-auto ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Name & email field */}
          <div className=" md:flex justify-between items-center md:gap-4">
            {/* Your Name */}
            <div className=" md:w-1/2 mb-4 md:mb-0">
              <label className="block mb-1 font-medium">Your Name</label>
              <input
                type="text"
                name="name"
                defaultValue={user?.displayName}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
            </div>
            {/* Email */}
            <div className=" md:w-1/2">
              <label className="block  mb-1 font-medium">Your Email</label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
            </div>
          </div>
          {/* Title & Category */}
          <div className="md:flex justify-between items-center md:gap-4">
            {/* PostedAt */}
            <div className=" md:w-1/2 mb-4 md:mb-0">
              <label className="block  mb-1 font-medium">Posted At</label>
              <input
                type="datetime-local"
                name="postedAt"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>
            {/* Category */}
            <div className=" md:w-1/2">
              <label className="block  mb-1 font-medium">Category</label>
              <select
                name="category"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              >
                <option value="">Select category</option>
                <option value="Nature">Nature</option>
                <option value="Abstract">Abstract</option>
                <option value="Portrait">Portrait</option>
                <option value="Digital">Digital</option>
                <option value="Surreal">Surreal</option>
              </select>
            </div>
          </div>
          {/*  */}

          <div>
            <label className="block  mb-1 font-medium">Artwork Title</label>
            <input
              type="text"
              name="title"
              placeholder="Whispers of the Forest"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {/* Art Image */}
          <div>
            <label className="block mb-1 font-medium">Art Image URL</label>
            <input
              type="text"
              name="artImage"
              placeholder="Art Image Url"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>
          {/* Description */}
          <div>
            <label className="block  mb-1 font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Soft green tones capture a quiet forest morning..."
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-success w-full text-lg  text-white font-semibold rounded-xl hover:bg-green-600 transition-all"
          >
            Add Artwork
          </button>
        </form>
      </MyContainer>
    </div>
  );
};

export default AddArtwork;
