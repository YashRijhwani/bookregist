import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Saved from "./pages/SavedBooks";
import { ToastContainer } from "react-toastify";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Search from "./pages/SearchBook";


class App extends Component {
  render() {
    return (
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/savedbooks" element={<Saved />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <ToastContainer />
      </main>
    );
  }
}

export default App;
