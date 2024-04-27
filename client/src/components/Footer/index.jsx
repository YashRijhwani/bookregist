import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className={`flex flex-col md:flex-row md:justify-around md:items-center bg-slate-200 mt-10 p-3`}
    >
      <Link to={"/"} className={`font-bold text-lg text-center`}>
        Bookilyx
      </Link>

      <div
        className={`text-sm text-center md:text-left mb-4 md:mb-0 text-black`}
      >
        <div
          className={`flex flex-row justify-center md:justify-start gap-4 mt-2`}
        >
          <a
            href="https://twitter.com"
            className={`hover:text-[#633131] block mb-2`}
          >
            <AiFillTwitterCircle className={`inline mr-2`} />
            Twitter
          </a>
          <a
            href="https://web.facebook.com"
            className={`hover:text-[#633131] block mb-2`}
          >
            <AiFillFacebook className={`inline mr-2`} />
            Facebook
          </a>
          <a
            href="https://www.instagram.com"
            className={`hover:text-[#633131]`}
          >
            <AiFillInstagram className={`inline mr-2`} />
            Instagram
          </a>
        </div>
      </div>
      <div className={`text-center md:text-left`}>
        © 2024 Bookilyx All rights reserved.
      </div>
      <p className={`text-center`}>
        Powered by{" "}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:underline text-sm text-pink-500`}
        >
          InterSwitch
        </a>
      </p>
    </footer>
  );
};

export default Footer;
