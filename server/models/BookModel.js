const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  authors: [{ 
    type: String, 
    required: true 
  }],
  description:  { 
    type: String, 
    required: true 
  },
  bookId: {
    type: String,
    // required: true,
  },
  image: { 
    type: String, 
    trim: true 
  },
  link: { 
    type: String, 
    trim: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;