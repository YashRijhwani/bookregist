import React, { useContext, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { BookSearch } from "../components";

export default function Hero() {
  const { user, profile, loading, login, setProfile } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          // Fetch user profile using the access token obtained from the server
          const profileResponse = await axios.get(
            "https://www.googleapis.com/oauth2/v1/userinfo",
            {
              headers: {
                Authorization: `Bearer ${user?.access_token}`,
                Accept: "application/json",
              },
            }
          );
          // Set profile state
          setProfile(profileResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [user, setProfile]);

  useEffect(() => {
    // Navigate to Dashboard page if user profile exists
    if (profile) {
      navigate("/dashboard");
    }
  }, [profile, navigate]);

  return (
    <>
      <div className={`bg-white p-8 rounded shadow-lg`}>
        <div className={`text-center md:flex-row flex-col`}>
          <h2 className={`text-2xl font-bold mb-4`}>
            Book Registry & Tracking Management
          </h2>

          <button
            onClick={login}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className={`animate-spin`} size={20} />
            ) : (
              "Sign in with Google 🚀"
            )}
          </button>
        </div>
      </div>

      <div
        className={`md:min-h-screen bg-gray-100 text-center md:flex-row flex-col`}
      >
        <BookSearch />
      </div>
    </>
  );
}
