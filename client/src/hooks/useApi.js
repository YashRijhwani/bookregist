import axios from 'axios';
import { useState } from 'react';

const instance = axios.create({
  baseURL: `http://localhost:3000/api/v1`,
  // baseURL: `https://bookshelf-registry-backend-server.onrender.com/api/v1`

});

const useApi = () => {
  const [searchData, setSearchData] = useState({ data: [], status: 0 });

  const searchAll = async ({ keyword, page }) => {
    const startindex = 40 * (page - 1);
    const { data: { data, total }, status } = await instance.get(`/searchAll/${keyword}/${startindex}`).catch((err) => {
      return ({ status: (err.response) ? err.response.status : "", data: { data: err.response, total: 0 } })
    });
    setSearchData({ data, status, total });
  }

  const getDetail = async (id) => {
    const { data, status } = await instance.get(`/getDetail/${id}`).catch((err) => {
      return ({ status: (err.response) ? err.response.status : "", data: err.response })
    });
    return ({ data, status })
  }

  const getMyBooks = async (token) => {
    const { data, status } = await instance.get(`/getMyBooks/${token}`).catch((err) => {
      return ({ status: (err.response) ? err.response.status : "", data: err.response })
    });
    return ({ data2: data, status2: status })
  }

  const getOneBookshelf = async (id, token) => {
    const { data, status } = await instance.get(`/getOneBookshelf/${id}/${token}`).catch((err) => {
      console.log('error')
      return ({ status: (err.response) ? err.response.status : "", data: err.response })
    });
    return ({ data, status })
  }

  const addBook = async (shelf, volume, token) => {
    const { status } = await instance.post(`/addBook/${shelf}/${volume}/${token}`).catch((err) => {
      return ({ status: (err.response) ? err.response.status : "", data: err.response })
    });
    return (status)
  }

  const moveBook = async (from, to, volume, token) => {
    const { status } = await instance.post(`/moveBook/${from}/${to}/${volume}/${token}`).catch((err) => {
      return ({ status: (err.response) ? err.response.status : "", data: err.response })
    });
    return (status)
  }

  const removeBook = async (shelf, volume, token) => {
    const { status } = await instance.post(`/removeBook/${shelf}/${volume}/${token}`).catch((err) => {
      return ({ status: (err.response) ? err.response.status : "", data: err.response })
    });
    return (status)
  }

  const clearShelf = async (shelf, token) => {
    const { status } = await instance.post(`/clearShelf/${shelf}/${token}`).catch((err) => {
      return ({ status: (err.response) ? err.response.status : "", data: err.response })
    });
    return (status)
  }

  return { searchAll, searchData, getDetail, getMyBooks, getOneBookshelf, addBook, moveBook, removeBook, clearShelf }
}


export default useApi;