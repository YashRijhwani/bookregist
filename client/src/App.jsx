import React, { useState, useEffect, useRef } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import BookSearch from "./components/BookSearch";

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);  
  const [loading, setLoading] = useState(false);


  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      // Inside your onSuccess callback
    console.log("Authorization code received:", codeResponse.code);

      try {
        console.log("User data:", codeResponse);
        setUser(codeResponse);

        // Ensure that codeResponse.code is not undefined
        console.log("Authorization code:", codeResponse?.code);

        // Exchange the received code for an access token on the server
        const tokenResponse = await axios.get(
          `https://bookshelf-registry-backend-server.onrender.com/oauth2callback?code=${codeResponse.code}`
          // `http://localhost:3000/oauth2callback?code=${codeResponse.code}`
        );
        console.log("Access Token:", tokenResponse.data.access_token);
      } catch (error) {
        console.error("Error exchanging code for access token:", error);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading spinner when fetching data
      try {
        if (user) {
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
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading spinner when fetching is done
      }
    };

    fetchData();
  }, [user]);

  // Log out function to log the user out of Google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
  };

  return (
    <div className={`md:min-h-screen bg-gray-100 text-center md:flex-row flex-col`}>
      <div className={`bg-white p-8 rounded shadow-lg`}>
        <h2 className={`text-2xl font-bold mb-4`}>Book Registry & Tracking Management</h2>

        <br />
        <br />
        {profile ? (
          <div>
            <img
              src={profile.picture}
              alt="user image"
              className={`w-20 h-20 rounded-full mx-auto`}
            />
            <h3 className={`text-xl font-semibold mt-4`}>User Logged in</h3>
            <p className={`mt-2`}>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <br />
            <button
              onClick={logOut}
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
            >
              Log out
            </button>

          </div>
        ) : (
          <button
            onClick={login}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
            disabled={loading}
          >
            {loading ? <FaSpinner className={`animate-spin`} size={20} /> : "Sign in with Google 🚀"}
      
          </button>
        )}
      </div>
      <BookSearch />
    </div>
  );
}
export default App;