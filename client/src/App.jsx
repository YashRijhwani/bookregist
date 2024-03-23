import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./App.css";

// const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const SignInWithGoogle = () => {
  // Callback function for successful Google
  const onSuccess = async (response) => {
    const { tokenId } = response; // Access token received from Google OAuth

    try {
      // Send the access token to the server
      const res = await fetch("http://localhost:3000/oauth2callback", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenId}`, // Attach the access token to the request headers
        },
      });

      if (res.ok) {
        // Successfully authenticated with Google Books API
        console.log("Successfully authenticated with Google Books API !!!");
      } else {
        // Handle error
        console.error("Error:", await res.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Callback function for failed Google login
  const onFailure = (error) => {
    console.error("Google login failed:", error);
  };

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My App</h1>
        <SignInWithGoogle />
      </header>
    </div>
  );
}

export default App;
