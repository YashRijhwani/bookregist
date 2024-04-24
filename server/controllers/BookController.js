const Book = require("../models/BookModel");

module.exports = {
  findAll: async function (req, res) {
    try {
      const books = await Book.find(req.query).sort({ date: -1 });
      res.json(books);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  findById: async function (req, res) {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  create: async function (req, res) {
    try {
      const newBook = await Book.create(req.body);
      res.json(newBook);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  update: async function (req, res) {
    try {
      const updatedBook = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
      if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(updatedBook);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  remove: async function (req, res) {
    try {
      const deletedBook = await Book.findOneAndDelete({ _id: req.params.id });
      if (!deletedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(deletedBook);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
};
