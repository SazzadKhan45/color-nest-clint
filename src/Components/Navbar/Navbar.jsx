import { use } from "react";
import MyContainer from "../MyContainer";
import { AuthContext } from "../../Providers/AuthContext";
import { NavLink, useNavigate } from "react-router";
import { Link } from "react-router";
import { RiMenu2Line } from "react-icons/ri";
import { ThemeContext } from "../../Providers/ThemeContext";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { toast } from "react-toastify";

const Navbar = () => {
  // All state
  const { isDark, toggleTheme } = use(ThemeContext);
  // Auth info
  const { user, loading, logoutUser } = use(AuthContext);
  // Navigate
  const navigate = useNavigate();

  // handle logout function
  const handleLogOut = () => {
    logoutUser()
      .then(() => {
        toast.success("User LogOut successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign-out error:", error.message);
      });
  };

  // NavLinks List
  const Links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `relative px-1 py-1 rounded-md 
        after:content-[''] after:absolute after:left-0 after:bottom-0 
        after:h-0.5 after:transition-all after:duration-300 
        ${
          isActive
            ? "after:w-full dark:after:bg-orange-400 font-semibold  dark:text-orange-400"
            : "after:w-0 after:bg-orange-600 dark:after:bg-orange-400 hover:after:w-full  dark:hover:text-orange-400"
        }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/explore-Artworks"
        className={({ isActive }) =>
          `relative px-1 py-1 rounded-md 
        after:content-[''] after:absolute after:left-0 after:bottom-0 
        after:h-0.5 after:transition-all after:duration-300 
        ${
          isActive
            ? "after:w-full dark:after:bg-orange-400 font-semibold  dark:text-orange-400"
            : "after:w-0 after:bg-orange-600 dark:after:bg-orange-400 hover:after:w-full  dark:hover:text-orange-400"
        }`
        }
      >
        Explore Artworks
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/my-Gallery"
            className={({ isActive }) =>
              `relative px-1 py-1 rounded-md 
        after:content-[''] after:absolute after:left-0 after:bottom-0 
        after:h-0.5 after:transition-all after:duration-300 
        ${
          isActive
            ? "after:w-full dark:after:bg-orange-400 font-semibold  dark:text-orange-400"
            : "after:w-0 after:bg-orange-600 dark:after:bg-orange-400 hover:after:w-full  dark:hover:text-orange-400"
        }`
            }
          >
            My Gallery
          </NavLink>
          <NavLink
            to="/my-Favorites"
            className={({ isActive }) =>
              `relative px-1 py-1 rounded-md 
        after:content-[''] after:absolute after:left-0 after:bottom-0 
        after:h-0.5 after:transition-all after:duration-300 
        ${
          isActive
            ? "after:w-full dark:after:bg-orange-400 font-semibold  dark:text-orange-400"
            : "after:w-0 after:bg-orange-600 dark:after:bg-orange-400 hover:after:w-full  dark:hover:text-orange-400"
        }`
            }
          >
            My Favorites
          </NavLink>
          <NavLink
            to="/add-Artwork"
            className={({ isActive }) =>
              `relative px-1 py-1 rounded-md 
        after:content-[''] after:absolute after:left-0 after:bottom-0 
        after:h-0.5 after:transition-all after:duration-300 
        ${
          isActive
            ? "after:w-full dark:after:bg-orange-400 font-semibold  dark:text-orange-400"
            : "after:w-0 after:bg-orange-600 dark:after:bg-orange-400 hover:after:w-full  dark:hover:text-orange-400"
        }`
            }
          >
            Add Artwork
          </NavLink>
        </>
      )}
    </>
  );
  //
  return (
    <div className={` shadow-sm ${isDark ? "bg-gray-700" : "bg-base-100"}`}>
      <MyContainer>
        <div className="navbar ">
          <div className="navbar-start">
            <div className="dropdown ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost md:hidden"
              >
                <RiMenu2Line size={25} />
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow flex space-y-3 pl-6 pb-4 ml-2 mt-3 md:hidden"
              >
                {Links}
              </ul>
            </div>
            <Link
              to="/"
              className="text-lg md:text-xl lg:text-2xl font-medium hidden md:flex"
            >
              Artify<span className="font-bold">Nest</span>
            </Link>
          </div>
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal px-1 flex md:gap-4 lg:gap-12 lg:text-[16px] font-medium">
              {Links}
            </ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="dropdown dropdown-bottom dropdown-center">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn m-1 w-10 h-10 p-0 overflow-hidden rounded-full border border-gray-300"
                >
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={user?.photoURL}
                    alt="User Avatar"
                  />
                </div>

                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-100 rounded-box z-1 py-2 px-6 shadow-sm"
                >
                  {/* Handle Logout function */}
                  <button onClick={handleLogOut} className="cursor-pointer">
                    LogOut
                  </button>
                </ul>
              </div>
            ) : loading ? (
              <span className="loading loading-spinner text-success"></span>
            ) : (
              <Link to="/login" className="btn">
                Login
              </Link>
            )}
            <div className="ml-4">
              {isDark ? (
                <div className="text-[#EBD8BA] shadow">
                  <IoMdMoon size={20} onClick={toggleTheme} />
                </div>
              ) : (
                <div className="cursor-pointer">
                  <IoMdSunny
                    size={20}
                    className="text-orange-400"
                    onClick={toggleTheme}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Navbar;
