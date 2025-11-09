import { use } from "react";
import MyContainer from "../MyContainer";
import { AuthContext } from "../../Providers/AuthContext";
import { NavLink } from "react-router";
import { Link } from "react-router";
import { RiMenu2Line } from "react-icons/ri";
import { ThemeContext } from "../../Providers/ThemeContext";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

const Navbar = () => {
  const { user } = use(AuthContext);
  const { isDark, toggleTheme } = use(ThemeContext);
  // NavLinks List
  const Links = (
    <>
      <NavLink
        to="/"
        className="border-b-2 border-transparent hover:border-gray-600"
      >
        Home
      </NavLink>
      <NavLink
        to="/explore-Artworks"
        className="border-b-2 border-transparent hover:border-gray-600"
      >
        Explore Artworks
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/add-Artwork"
            className="border-b-2 border-transparent hover:border-gray-600"
          >
            Add Artwork
          </NavLink>
          <NavLink
            to="/my-Gallery"
            className="border-b-2 border-transparent hover:border-gray-600"
          >
            My Gallery
          </NavLink>
          <NavLink
            to="/my-Favorites"
            className="border-b-2 border-transparent hover:border-gray-600"
          >
            My Favorites
          </NavLink>
        </>
      )}
    </>
  );
  //
  return (
    <div className="bg-base-100 shadow-sm">
      <MyContainer>
        <div className="navbar ">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost md:hidden"
              >
                <RiMenu2Line size={25} />
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow flex"
              >
                {Links}
              </ul>
            </div>
            <Link to="/" className="text-2xl font-medium hidden md:flex">
              Artify<span className="font-bold">Nest</span>
            </Link>
          </div>
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal px-1 flex gap-4 lg:text-[16px] font-medium">
              {Links}
            </ul>
          </div>
          <div className="navbar-end">
            <a className="btn">Button</a>
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
