import React, { useContext, useState } from "react";
import { FaBars, FaTimes, FaSpinner } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const { profile, logOut } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleMobileNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  return (
    <>
      <nav className={`flex items-center space-x-4`}>
        <ul
          className={`flex items-center space-x-4 ${
            nav ? "block" : "hidden"
          } md:flex`}
        >
          {profile ? (
            <>
              <img
                src={profile.picture}
                alt={profile.name}
                className={`w-10 h-10 rounded-full`}
              />

              <button
                onClick={handleLogout}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Log out
              </button>
            </>
          ) : null}
        </ul>
        <div className="md:hidden">
          {nav ? (
            <FaTimes
              onClick={toggleMobileNav}
              className="text-gray-500 cursor-pointer"
            />
          ) : (
            <FaBars
              onClick={toggleMobileNav}
              className="text-gray-500 cursor-pointer"
            />
          )}
        </div>
      </nav>
    </>
  );
}
