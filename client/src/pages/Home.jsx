import React, { useContext } from "react";
import { Container, Button } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const { user, login, signup } = useContext(UserContext);
  console.log("User:", user);

  return (
    <>
      {user && <Dashboard />}
      <Container className="flex flex-col items-center py-10">
        {!user && (
          <>
            <p className="text-center text-gray-700 h-40 text-2xl">
              Log in with your Google account, to explore your personal book
              tracker!
            </p>
            <Button className="text-blue-500 mb-7" onClick={login}>
              Log In with Google 🚀
            </Button>
            <p className="text-gray-500">
              Doesn't have an account?
              <Button className="ml-1 text-blue-500" onClick={signup}>
                Sign Up
              </Button>
            </p>
          </>
        )}
      </Container>
    </>
  );
}
