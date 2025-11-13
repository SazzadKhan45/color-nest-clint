import React, { use } from "react";
import MyContainer from "../MyContainer";
import { ThemeContext } from "../../Providers/ThemeContext";
import { Link } from "react-router";
import { FaBehance, FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLocalPhone, MdOutlineMail } from "react-icons/md";

const Footer = () => {
  // Theme context
  const { isDark } = use(ThemeContext);
  return (
    <div className={` ${isDark ? "bg-gray-700" : "bg-base-300"}`}>
      <MyContainer>
        <footer className="md:flex justify-between md:gap-8 space-y-8 py-10 px-4 md:px-0">
          <nav>
            <h6 className="footer-title border-b-2">Contact Info</h6>
            <p className="flex  items-center gap-1">
              <MdLocalPhone /> +8801850899
            </p>
            <p className="flex  items-center gap-1">
              <MdOutlineMail /> sazzad753@gmail.com
            </p>
            <div className="flex gap-3 cursor-pointer mt-2 text-black">
              {/*  */}
              <Link
                className="bg-amber-50 p-1 rounded-full"
                to="https://www.facebook.com/"
                target="_blank"
              >
                <FaFacebookF size={15} />
              </Link>
              <Link
                className="bg-amber-50 p-1 rounded-full"
                to="https://www.instagram.com/"
                target="_blank"
              >
                <FaInstagram size={15} />
              </Link>
              <Link
                className="bg-amber-50 p-1 rounded-full"
                to="https://x.com/home"
                target="_blank"
              >
                <FaXTwitter size={15} />
              </Link>
              <Link
                className="bg-amber-50 p-1 rounded-full"
                to="https://www.facebook.com/"
                target="_blank"
              >
                <FaBehance size={15} />
              </Link>
            </div>
          </nav>
          <nav>
            <h6 className="footer-title border-b-2">Legal Info</h6>
            <p className="link link-hover">Terms of use</p>
            <p className="link link-hover">Privacy policy</p>
            <p className="link link-hover">Cookie policy</p>
          </nav>
          <div>
            <Link
              to="/"
              className="text-lg md:text-xl lg:text-2xl font-medium border-b-2"
            >
              Artify<span className="font-bold">Nest</span>
            </Link>
            <form className="mt-3">
              <fieldset className="w-80">
                <label>Enter your email address</label>
                <div className="join">
                  <input
                    type="text"
                    placeholder="username@site.com"
                    className="input input-bordered join-item"
                  />
                  <button className="btn btn-secondary join-item">
                    Subscribe
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </footer>
      </MyContainer>
      <footer
        className={`footer sm:footer-horizontal footer-center  text-base-content p-4 ${
          isDark ? "bg-gray-800 " : "bg-gray-300 "
        }`}
      >
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right{" "}
            <span className="font-bold">ArtifyNest</span>
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
