import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import bookImage from "../../assets/images/bookTracker_img.png";
import Auth from "../../utils/auth";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [username, setUsername] = useState("");

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

    const fetchUsername = async () => {
      try {
        const profile = await Auth.getProfile();
        if (profile) {
          // console.log("Profile", profile);
          setUsername(profile.data.username);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();

    return () => {
      // Clean up the event listener
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", useScrollPosition);
    };
  }, [prevScrollPos]);

  const handleClick = (anchor) => (event) => {
    event.preventDefault();
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

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
        {Auth.loggedIn() && ( // Check if the user is logged in
          <>
            {username && (
              <p className={`flex justify-center items-center gap-2`}>
                <span className={`text-white`}>Welcome!</span>{" "}
                <span
                  className={`text-orange-500 bg-orange-100 text-xs font-semibold px-2 py-1 rounded border`}
                >
                  {username}
                </span>
              </p>
            )}
            <li>
              <Link
                to={`/savedbooks`}
                className={`px-4 flex justify-center items-center cursor-pointer capitalize font-medium text-[#f4f4f4] hover:text-[#d2d2d2] duration-200`}
              >
                Saved Books
              </Link>
            </li>
          </>
        )}

        {Auth.loggedIn() && (
          <Link
            to={`/search`}
            className={`bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            <FaSearch />
          </Link>
        )}
        {Auth.loggedIn() ? ( // Check if the user is logged in
          <>
            <button
              onClick={handleLogout}
              className={`bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <li
              className={`px-4 cursor-pointer capitalize font-medium text-[#f4f4f4] hover:text-[#d2d2d2] duration-200`}
            >
              <a href="#blog" onClick={handleClick("blog")}>
                Blog
              </a>
            </li>
            <li
              className={`px-4 cursor-pointer capitalize font-medium text-[#f4f4f4] hover:text-[#d2d2d2] duration-200`}
            >
              <a href="#contact" onClick={handleClick("contact")}>
                Contact
              </a>
            </li>
            <Link
              to={`/login`}
              className={`bg-white hover:bg-gray-200 text-black  font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}
            >
              LogIn
            </Link>
          </>
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
          {Auth.loggedIn() && (
            <Link
              to={`/search`}
              className={`bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5`}
            >
              <FaSearch />
            </Link>
          )}

          {Auth.loggedIn() ? ( // Check if the user is logged in
            <>
              <button
                onClick={handleLogout}
                className={`bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-10`}
              >
                LogOut
              </button>
              {username && (
                <p className={`flex justify-center items-center gap-2 mb-4`}>
                  <span className={`text-white`}>Welcome!</span>{" "}
                  <span
                    className={`text-orange-500 bg-orange-100 text-xs font-semibold px-2 py-1 rounded border`}
                  >
                    {username}
                  </span>
                </p>
              )}
            </>
          ) : (
            <>
              <li
                className={`px-4 cursor-pointer capitalize font-medium text-[#f4f4f4] hover:text-[#d2d2d2] duration-200 my-4`}
                onClick={() => setNav(!nav)}
              >
                <a href="#blog" onClick={handleClick("blog")}>
                  Blog
                </a>
              </li>
              <li
                className={`px-4 cursor-pointer capitalize font-medium text-[#f4f4f4] hover:text-[#d2d2d2] duration-200`}
                onClick={() => setNav(!nav)}
              >
                <a href="#contact" onClick={handleClick("contact")}>
                  Contact
                </a>
              </li>
              <Link
                to={`/register`}
                className={`bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5`}
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
