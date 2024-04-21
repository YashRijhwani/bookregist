// BookshelfContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const BookshelfContext = createContext();

export const useBookshelfContext = () => useContext(BookshelfContext);

export const BookshelfProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const handleBookSearch = async (searchQuery, currentPage) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/searchAll/${searchQuery}/${currentPage}`
        //  `https://bookshelf-registry-backend-server.onrender.com/api/v1/searchAll/${searchQuery}/${currentPage}`
      );
      return response.data;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const getBookDetail = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/getDetail/${id}`
        // `https://bookshelf-registry-backend-server.onrender.com/api/v1/getDetail/${id}`
      );
      return response.data;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const getMyBooks = async (token) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/getMyBooks/${token}`
        // `https://bookshelf-registry-backend-server.onrender.com/api/v1/getMyBooks/token`
      );
      return response.data;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const getOneBookshelf = async (id, token) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/getOneBookshelf/${id}/${token}`
        // `https://bookshelf-registry-backend-server.onrender.com/api/v1/getOneBookshelf/id/token`
      );
      return response.data;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const addBook = async (shelf, volume, token) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/addBook/${shelf}/${volume}/${token}`
        // `https://bookshelf-registry-backend-server.onrender.com/api/v1/addBook/shelf/volume/token`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const moveBook = async (from, to, volume, token) => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/moveBook/${from}/${to}/${volume}/${token}`
        // `https://bookshelf-registry-backend-server.onrender.com/api/v1/moveBook/from/to/volume/token`
      );
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const removeBook = async (shelf, volume, token) => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/removeBook/${shelf}/${volume}/${token}`
        // `https://bookshelf-registry-backend-server.onrender.com/api/v1/removeBook/shelf/volume/token`
      );
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const clearShelf = async (shelf, token) => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/clearShelf/${shelf}/${token}`
        // `https://bookshelf-registry-backend-server.onrender.com/api/v1/clearShelf/shelf/token`
      );
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  return (
    <BookshelfContext.Provider
      value={{
        handleBookSearch,
        getBookDetail,
        getMyBooks,
        getOneBookshelf,
        addBook,
        moveBook,
        removeBook,
        clearShelf,
        error,
      }}
    >
      {children}
    </BookshelfContext.Provider>
  );
};
