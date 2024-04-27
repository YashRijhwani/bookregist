import React, { useState } from "react";
import { createUser } from "../../utils/UserApi";
import Auth from "../../utils/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../Navbar";
import { validateEmail } from "../../utils/validateEmail";
import { validatePassword } from "../../utils/passwordUtils";

const SignUp = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const navigate = useNavigate();
  // set state for form validation
  const [validated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const togglePasswordVisibility = (field) => {
    setUserFormData({ ...userFormData, [field]: !userFormData[field] });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Validate email format
    try {
      validateEmail(userFormData.email);
    } catch (error) {
      toast.error(error.message);
      return;
    }

    const isPasswordValid = validatePassword(userFormData.password);
    if (!isPasswordValid) {
      return;
    }

    // check if passwords match
    if (userFormData.password !== userFormData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await createUser(userFormData);
      // console.log(response);
      if (!response.data.token || !response.data.user) {
        toast.error("Something went wrong!");
        return;
      }
      const { token, user } = await response.data;
      toast.success("Sign up successful. Redirecting...", {
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // If the error response status is 400 (Bad Request),
        // it means the email is already in use
        toast.error("Email is already in use. Please use a different email.");
      } else {
        // Handle other types of errors if needed
        toast.error("Failed to create user. Please try again later.");
      }
    } finally {
      setLoading(false);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
    });
  };

  return (
    <>
      <Navbar />
      <div
        className={`max-w-sm md:max-w-md md:mx-auto mx-7 mt-10 p-6 bg-white rounded-lg shadow-xl`}
      >
        <h1 className={`text-lg md:text-3xl text-center font-semibold mb-6`}>
          Sign Up
        </h1>
        <p className={`text-sm md:text-xl text-center font-semibold mb-6`}>
          Explore our Redefined Bookshelf
        </p>

        <form
          {...(validated ? { validated: "true" } : {})}
          onSubmit={handleFormSubmit}
        >
          <div className={`mb-4`}>
            <label
              htmlFor={`username`}
              className={`block text-sm font-medium text-gray-700`}
            >
              Username:
            </label>
            <input
              type={`text`}
              name={`username`}
              placeholder={`John Doe`}
              onChange={handleInputChange}
              value={userFormData.username}
              className={`mt-1 p-2 w-full border border-gray-300 rounded-md`}
              required
            />
          </div>

          {/* Email input */}
          <div className={`mb-4`}>
            <label
              htmlFor={`email`}
              className={`block text-sm font-medium text-gray-700`}
            >
              Email:
            </label>
            <input
              type={`email`}
              name={`email`}
              placeholder={`example@example.com`}
              onChange={handleInputChange}
              value={userFormData.email}
              className={`mt-1 p-2 w-full border border-gray-300 rounded-md`}
              required
            />
          </div>

          {/* Password input */}
          <div className="md:flex">
            <div className="mb-4 md:w-1/2 md:pr-2">
              <label
                htmlFor={`password`}
                className={`block text-sm font-medium text-gray-700`}
              >
                Password:
              </label>
              <div className="relative">
                <input
                  type={userFormData.showPassword ? "text" : "password"}
                  name={`password`}
                  placeholder={`Your password`}
                  onChange={handleInputChange}
                  value={userFormData.password}
                  className={`mt-1 p-2 w-full border border-gray-300 rounded-md`}
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("showPassword")}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none`}
                >
                  {userFormData.showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password input */}
            <div className={`mb-4`}>
              <label
                htmlFor={`confirmPassword`}
                className={`block text-sm font-medium text-gray-700`}
              >
                Confirm Password:
              </label>
              <div className="relative">
                <input
                  type={userFormData.showConfirmPassword ? "text" : "password"}
                  name={`confirmPassword`}
                  placeholder={`Confirm password`}
                  onChange={handleInputChange}
                  value={userFormData.confirmPassword}
                  className={`mt-1 p-2 w-full border border-gray-300 rounded-md`}
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    togglePasswordVisibility("showConfirmPassword")
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                >
                  {userFormData.showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            disabled={
              loading ||
              !(
                userFormData.username &&
                userFormData.email &&
                userFormData.password
              )
            }
            type={`submit`}
            className={`w-full bg-orange-500
            hover:bg-orange-600 text-white cursor-pointer rounded-md py-2 px-4 font-bold`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <div className={`block text-center my-10`}>
          <span>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Log In
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default SignUp;
