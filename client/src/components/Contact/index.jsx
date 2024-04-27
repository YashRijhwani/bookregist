import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaSpinner } from "react-icons/fa";
import {
  AiFillTwitterCircle,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendInquiry } from "../../utils/UserApi";

import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await sendInquiry(formData);
      //   console.log("Response", response);

      // Show a success toast message
      toast.success("Message sent successfully!", {
        autoClose: 1000,
        position: "top-right",
      });

      // Clear the form by resetting the formData state
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Message submission failed:", error);
      toast.error("Form submission failed. Please try again.", {
        autoClose: 2000,
        position: "top-left",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="bg-slate-100 shadow-xl mx-2 rounded-md p-4 my-20"
      id="contact-section"
    >
      <div className="title_head mb-4">
        <h2 className="md:text-2xl text-xl font-bold text-center text-title capitalize">
          Contact
        </h2>
        <p className="text-center capitalize text-subTitle mb-10">
          Reach out to us!
        </p>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 md:p-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-title">
              Our Offices
            </h2>
            <p>
              <FaMapMarkerAlt className="inline mr-2 text-red" />
              22, Lorem ipsum dolor sit amet. Bookilyx.
            </p>
            <p>
              <FaEnvelope className="inline mr-2 text-orange-500" />
              contact@bookilyx.com
            </p>
            <p>
              <FaPhone className="inline mr-2 text-green" />
              +1 234 (0) 5678 910
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-title">
              Social Media
            </h2>
            <a href="https://twitter.com" className="text-blue block mb-2">
              <AiFillTwitterCircle className="inline mr-2" />
              Twitter
            </a>
            <a
              href="https://web.facebook.com"
              className="text-primary block mb-2"
            >
              <AiFillFacebook className="inline mr-2" />
              Facebook
            </a>
            <a href="https://www.instagram.com" className="text-pink-600">
              <AiFillInstagram className="inline mr-2" />
              Instagram
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 md:p-8">
          <h2 className="text-xl font-semibold my-7 text-title">Enquiries</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="md:w-1/2 w-full px-2">
                <label htmlFor="name" className="block font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border rounded capitalize"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:w-1/2 w-full px-2">
                <label htmlFor="email" className="block font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="md:w-full mb-4">
              <label htmlFor="message" className="block font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full px-3 py-2 border rounded"
                required
                placeholder="Your message"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-7 py-2 rounded capitalize relative flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2">
                    <FaSpinner className="animate-spin" />
                  </span>
                  <span>Sending Messsage...</span>
                </>
              ) : (
                "Send a Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
