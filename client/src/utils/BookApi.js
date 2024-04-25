import axios from "axios"

export default {
    // Get book from google search 
    getGoogleSearchBooks: function (query) {
        return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + query)
    },

    // Gets all books
    getBooks: function () {
        return axios.get(
            `https://bookshelf-registry-backend-server.onrender.com/api/books`
            // "http://localhost:3000/api/books"
        );
    },

    // Gets the book with the given id
    getBook: function (id) {
        return axios.get(
            `https://bookshelf-registry-backend-server.onrender.com/api/books/`
            // "http://localhost:3000/api/books/"
            + id);
    },

    // Saves a book to the database
    saveBook: function (savedBooks) {
        return axios.post(
            `https://bookshelf-registry-backend-server.onrender.com/api/books/`,
            // "http://localhost:3000/api/books/",
            savedBooks);
    },

    // Deletes the book with the given id
    deleteBook: function (id) {
        return axios.delete(
            `https://bookshelf-registry-backend-server.onrender.com/api/books/`
            // "http://localhost:3000/api/books/"
             + id);
    }

}