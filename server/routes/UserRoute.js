const express = require('express');
const router = express.Router();
const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
  sendInquiry
} = require('../controllers/UserController');

// Import middleware
const { authMiddleware } = require('../utils/auth');

// Routes
router.post('/users', createUser); // Route for user signup
router.post('/login', login); // Route for user login
router.post('/inquiry', sendInquiry); // Route for user login

// Protected routes (require authentication)
router.get('/getuser', authMiddleware, getSingleUser); // Route to get single user profile
router.put('/books', authMiddleware, saveBook); // Route to save book for authenticated user
router.delete('/books/:bookId', authMiddleware, deleteBook); // Route to delete book for authenticated user

module.exports = router;
