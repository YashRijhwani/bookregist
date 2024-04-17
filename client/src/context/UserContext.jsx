import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const loginUser = async (codeResponse) => {
    try {
      console.log("Authorization code received:", codeResponse.code);
      setUser(codeResponse);

      // Ensure that codeResponse.code is not undefined
      console.log("Authorization code:", codeResponse?.code);

      // Exchange the received code for an access token on the server
      const tokenResponse = await axios.get(
        // `https://bookshelf-registry-backend-server.onrender.com/oauth2callback?code=${codeResponse.code}`
        `http://localhost:3000/oauth2callback?code=${codeResponse.code}`
      );
      console.log("Access Token:", tokenResponse.data.access_token);
    } catch (error) {
      console.error("Error exchanging code for access token:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: loginUser,
    onError: (error) => console.log("Login Failed:", error),
  });

  const logOut = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
  };

  return (
      <UserContext.Provider value={{ user, setUser, profile, setProfile, loading, login, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
