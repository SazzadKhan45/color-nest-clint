import { use } from "react";
import MyContainer from "../MyContainer";
import { ThemeContext } from "../../Providers/ThemeContext";
import { AuthContext } from "../../Providers/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddArtwork = () => {
  // ThemContext
  const { isDark } = use(ThemeContext);
  // AuthContext
  const { user } = use(AuthContext);
  console.log(user);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Get value from input filed
    const painterName = user?.displayName || "Unknown";
    const email = user?.email || "no-email";
    const title = e.target.title.value;
    const painterImage = user?.photoURL || "";
    const category = e.target.category.value;
    const artImage = e.target.artImage.value;
    const downloadCount = 0;
    const likeCount = 0;
    const description = e.target.description.value;
    //Art info
    const artInfo = {
      painterImage,
      email,
      title,
      category,
      artImage,
      downloadCount,
      likeCount,
      description,
      painterName,
    };
    //Post art works
    axios
      .post("http://localhost:3000/explore-art", artInfo)
      .then((res) => {
        console.log(res.data);
        toast.success("Art works is successfully added");
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
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Add New Artwork
        </h2>

        <form
          onSubmit={handleSubmit}
          className={`shadow-md rounded-2xl px-4 py-8 md:p-8 space-y-5 max-w-2xl mx-auto ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Your Name */}
          <div>
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
          <div>
            <label className="block  mb-1 font-medium">Your Email</label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>
          {/* Title */}
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
          {/* Category */}
          <div>
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

          {/* PostedAt */}
          <div>
            <label className="block  mb-1 font-medium">Posted At</label>
            <input
              type="datetime-local"
              name="postedAt"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
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

          {/* Painter Image */}
          <div>
            <label className="block mb-1 font-medium">Profile Image URL</label>
            <input
              type="text"
              name="painterImage"
              defaultValue={user?.photoURL}
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
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-all"
          >
            Add Artwork
          </button>
        </form>
      </MyContainer>
    </div>
  );
};

export default AddArtwork;
