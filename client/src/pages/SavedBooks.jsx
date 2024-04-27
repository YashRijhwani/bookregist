import React, { Component } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/BookApi";
import ResultCard from "../components/ResultCard";
import { toast } from "react-toastify";
import { removeBookId } from "../utils/localStorage"; // Import removeBookId function

class Saved extends Component {
  state = {
    results: [],
  };

  componentDidMount() {
    API.getBooks()
      .then((res) => {
        this.setState({ results: res.data });
      })
      .catch((err) => {
        throw err;
      });
  }

  handleDeleteBook = (event) => {
    event.preventDefault();

    const bookID = event.target.getAttribute("data-id");

    const newState = { ...this.state };

    newState.results = this.state.results.filter((book) => book._id !== bookID);

    API.deleteBook(bookID)
      .then((response) => {
        this.setState(newState);
        // console.log(response);
        toast.success("Book deleted successfully!", { autoClose: 500 });
        removeBookId(bookID); // Remove book ID from localStorage
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { results } = this.state;
    const savedBooksCount = results.length;

    return (
      <div>
        <Navbar />
        <div>
          <h3 className={`text-center md:text-2xl mt-5 text-indigo-900`}>
            -- Your Saved Books --
            <div
              className={`flex items-center justify-center rounded-full bg-blue-500 text-white md:w-10 w-7 md:h-10 h-7 mx-auto`}
            >
              {savedBooksCount}
            </div>
          </h3>

          <div className={``}>
            {results.map((book) => {
              return (
                <ResultCard
                  key={book._id}
                  title={book?.title}
                  id={book?._id}
                  link={book?.link}
                  author={book?.authors}
                  image={book?.image}
                  description={book?.description}
                  deleteBook={this.handleDeleteBook}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Saved;
