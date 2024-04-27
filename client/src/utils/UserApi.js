import axios from 'axios';

// route to get logged in user's info (needs the token)
export const getMe = (token) => {
    return axios.get(
        `https://bookshelf-registry-backend-server.onrender.com/api/getuser`,
        // 'http://localhost:3000/api/getuser',
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
};

export const createUser = (userData) => {
    return axios.post(
        `https://bookshelf-registry-backend-server.onrender.com/api/users`,
        // 'http://localhost:3000/api/users',
        userData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const loginUser = (userData) => {
    return axios.post(
        `https://bookshelf-registry-backend-server.onrender.com/api/login`,
        // 'http://localhost:3000/api/login',
        userData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};


export const sendInquiry = (formData) => {
    return axios.post(
        `https://bookshelf-registry-backend-server.onrender.com/api/inquiry`,
        // 'http://localhost:3000/api/inquiry',
        formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

// Gets all books
// export const getBooks = (bookData, token) => {
//     return axios.put('http://localhost:3000/api/books', bookData, {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         },
//     });
// };


// Gets the book with the given id
// export const getBook = (bookData, token) => {
//     return axios.put('http://localhost:3000/api/books', bookData, {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         },
//     });
// };


// save book data for a logged in user
// export const saveBook = (bookData, token) => {
//     return axios.put('http://localhost:3000/api/books', bookData, {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         },
//     });
// };

// remove saved book data for a logged in user
// export const deleteBook = (bookId, token) => {
//     return axios.delete(`http://localhost:3000/api/books/${bookId}`, {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//         },
//     });
// };

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
