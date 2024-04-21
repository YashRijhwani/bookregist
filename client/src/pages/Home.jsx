import React, { useContext, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { Dashboard, SignUpForm } from "../components";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";


export default function Home() {
  const { user, login } = useContext(UserContext);
  console.log("User:", user);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      {user && <Dashboard />}
      <Container className="flex flex-col items-center py-10">
        {!user && (
          <>
            <p className="text-center text-gray-700 h-40 text-2xl">
              Log in with your Google account to explore your personal book
              tracker!
            </p>
            <Button className="text-blue-500 mb-7" onClick={() => login()}>
              Log In with Google 🚀
            </Button>
            <p className="text-gray-500">
              Doesn't have an account?
              <Button className="ml-1 text-blue-500" onClick={handleOpenModal}>
                Sign Up
              </Button>
            </p>
            <Modal open={openModal} onClose={handleCloseModal} center>
              <SignUpForm />
            </Modal>
          </>
        )}
      </Container>
    </>
  );
}
