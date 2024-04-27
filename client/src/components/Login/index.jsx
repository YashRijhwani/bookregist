import React, { useState } from "react";
import { loginUser } from "../../utils/UserApi";
import Auth from "../../utils/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginUser(userFormData);

      // console.log(response);
      if (!response.data.token || !response.data.user) {
        toast.error("Something went wrong!");
        return;
      }
      const { token, user } = response.data;
      // console.log(user);
      Auth.login(token);
      toast.success("Login up successful. Redirecting...", {
        autoClose: 500,
      });

      setTimeout(() => {
        navigate("/search");
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Navbar />
      <form
        className={`max-w-sm md:max-w-md md:mx-auto mx-7 mt-10 p-6 bg-white rounded-lg shadow-xl`}
        {...(validated ? { validated: "true" } : {})}
        onSubmit={handleFormSubmit}
      >
        <h2
          className={`md:text-left text-center text-xl font-bold text-slate-400 my-5`}
        >
          Log In to Bookilyx
        </h2>
        <div className={`mb-4`}>
          <label
            htmlFor={`email`}
            className={`block text-sm font-medium text-gray-700`}
          >
            Email
          </label>
          <input
            type={`text`}
            name={`email`}
            onChange={handleInputChange}
            value={userFormData.email}
            className={`mt-1 p-2 w-full border border-gray-300 rounded-md`}
            required
          />
        </div>

        <div className={`mb-4`}>
          <label
            htmlFor={`password`}
            className={`block text-sm font-medium text-gray-700`}
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name={`password`}
              onChange={handleInputChange}
              value={userFormData.password}
              className={`mt-1 p-2 w-full border border-gray-300 rounded-md`}
              required
            />
            <button
              type="button"
              className={`absolute right-3 top-4 text-gray-500`}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          disabled={isLoading || !(userFormData.email && userFormData.password)}
          type={`submit`}
          className={`w-full bg-orange-500 cursor-pointer text-white rounded-md py-2 px-4 hover:bg-orange-600 font-bold`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <div className="block text-center my-10">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-600">
            Sign Up
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
