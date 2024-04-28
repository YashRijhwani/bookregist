import React from "react";
import Home from "../../pages/Home";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import Blog from "../Blog";
import Contact from "../Contact";

const Hero = () => {
  return (
    <Layout>
      <div className={`relative h-screen flex justify-center items-center`}>
        <img
          className={`absolute inset-0 w-full h-full object-cover`}
          src={`https://images.unsplash.com/photo-1651313745674-eb83846a1d85?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
          alt="Bookshelf"
        />
        <div className={`absolute inset-0 bg-black opacity-50`}></div>
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center`}
        >
          <h1
            className={`md:text-4xl text-xl text-white font-bold capitalize text-center`}
          >
            reading books becomes easier with bookilyx
          </h1>
          <Link
            to={`/register`}
            className={`bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center my-8`}
          >
            Get Started
          </Link>
        </div>
      </div>

      <Blog />
      <Contact />
    </Layout>
  );
};

export default Hero;
