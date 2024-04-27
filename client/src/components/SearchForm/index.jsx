import React, { useState, useRef, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

function SearchForm(props) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleFormSubmit = async (event) => {
    // Receive event object
    event.preventDefault();
    setLoading(true);
    await props.handleFormSubmit(event);
    setLoading(false);
  };

  useEffect(() => {
    focusInput();
  }, []);

  // Function to focus on the input field
  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <div
        className={`flex md:flex-row flex-col md:items-center md:justify-center text-center mt-5 mx-auto`}
      >
        <form onSubmit={handleFormSubmit}>
          <input
            ref={inputRef}
            className={`bg-gray-200 rounded-lg p-2 w-64 outline-none mr-2`}
            name="title"
            placeholder="Search for a book..."
            type="text"
            onChange={props.handleInputChange}
          />

          <button
            className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-24 mt-2`}
            type="submit"
          >
            {loading ? <FaSpinner className={`animate-spin`} /> : "Search"}
          </button>
        </form>
      </div>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-200 opacity-75 flex justify-center items-center">
          <FaSpinner className={`animate-spin text-orange-500`} />
        </div>
      )}
    </>
  );
}

export default SearchForm;
