import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import bookImage from "../../assets/images/bookTracker_img.png";
import Auth from "../../utils/auth";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    Auth.logout();
    navigate("/");
  };

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 793) {
        // Show navigation links for devices wider than 768px
        setNav(true);
      } else {
        // Hide navigation links for devices narrower than or equal to 768px
        setNav(false);
      }
    };

    const useScrollPosition = () => {
      const currentScrollPos = window.scrollY;
      const visible = prevScrollPos > currentScrollPos;
      setVisible(visible);
      setPrevScrollPos(currentScrollPos);
    };

    // Set up event listener for window resize and scroll Position
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", useScrollPosition);

    return () => {
      // Clean up the event listener
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", useScrollPosition);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    // Fetch user information when the component mounts
    const fetchUserInfo = async () => {
      try {
        const user = await Auth.getProfile();
        setUserInfo(user);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    if (Auth.loggedIn()) {
      fetchUserInfo();
    }
  }, []);

  return (
    <div
      className={`flex justify-between items-center w-full h-20 px-4 bg-[#3a4814] border-b border-[#e4d5c7] sticky top-0 z-50 ${
        visible ? "shadow backdrop-blur-lg backdrop-filter" : "shadow-none"
      }`}
      style={{
        top: visible ? "0" : "-100px",
        transition: "top 0.5s ease-in-out",
      }}
    >
      <Link
        className={`md:text-lg text-sm font-bold ml-2 text-[#fff] flex justify-center items-center`}
        href={"/"}
      >
        <img src={bookImage} alt="Book" className={`w-10 h-10`} />
        <p className={`ml-1`}>Bookilyx</p>
      </Link>

      {/* Desktop View */}
      <ul
        className={`space-x-16 hidden md:flex md:justify-between items-center`}
      >
        {Auth.getProfile() && (
          <li>
            <p className="text-white">
              {userInfo?.username || userInfo?.email}
            </p>
          </li>
        )}
        {Auth.loggedIn() && ( // Check if the user is logged in
          <li>
            <Link
              to={`/savedbooks`}
              className={`px-4 cursor-pointer capitalize font-medium text-[#f4f4f4] hover:text-[#d2d2d2] duration-200`}
            >
              Saved Books
            </Link>
          </li>
        )}
        <Link
          to={`/`}
          className={`px-4 cursor-pointer capitalize font-medium text-[#f4f4f4] hover:text-[#d2d2d2] duration-200`}
        >
          Blog
        </Link>
        <Link
          to={`/`}
          className={`px-4 cursor-pointer capitalize font-medium text-[#f4f4f4] hover:text-[#d2d2d2] duration-200`}
        >
          Contact
        </Link>
        {Auth.loggedIn() ? ( // Check if the user is logged in
          <button
            onClick={handleLogout}
            className={`bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            Logout
          </button>
        ) : (
          <Link
            to={`/login`}
            className={`bg-white hover:bg-gray-200 text-black  font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}
          >
            LogIn
          </Link>
        )}
      </ul>

      <div className={`md:flex space-x-4 hidden`}></div>

      <div
        onClick={() => setNav(!nav)}
        className={`cursor-pointer pr-4 z-10 text-[#e4d5c7] md:hidden`}
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* Mobile view */}
      {nav ? (
        <ul
          className={`flex flex-col justify-center items-center absolute top-0 left-0 w-full bg-[#3a6183] text-[#f4f4f4] my-20 z-50 md:hidden`}
        >
          {Auth.loggedIn() && (
            <Link
              to={`/savedbooks`}
              className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5`}
            >
              Saved Books
            </Link>
          )}
          {Auth.loggedIn() ? ( // Check if the user is logged in
            <button
              onClick={handleLogout}
              className={`bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-10`}
            >
              LogOut
            </button>
          ) : (
            <>
              <Link
                to={`/register`}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-10`}
              >
                Get Started
              </Link>
              <Link
                to={`/login`}
                className={`bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-10`}
              >
                LogIn
              </Link>
            </>
          )}
        </ul>
      ) : null}
    </div>
  );
};
export default Navbar;
