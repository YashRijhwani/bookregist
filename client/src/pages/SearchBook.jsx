import React, { Component } from "react";
import API from "../utils/BookApi";
import ResultCard from "../components/ResultCard";
import SearchForm from "../components/SearchForm";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { getSavedBookIds, saveBookIds } from "../utils/localStorage"; // Import local storage functions

class Search extends Component {
  state = {
    books: [],
    results: [],
    title: "",
    savedBookIds: [], // Initialize savedBookIds state
  };

  componentDidMount() {
    // Retrieve saved book IDs from local storage and set them in state
    const savedBookIds = getSavedBookIds();
    this.setState({ savedBookIds });

    API.getBooks()
      .then((res) => {
        this.setState({ books: res.data });
        // console.log("books:", this.state.books);
      })
      .catch((err) => {
        throw err;
      });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    API.getGoogleSearchBooks(this.state.title)
      .then((res) => {
        this.setState({
          results: res.data.items,
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  handleSaveBook = (event) => {
    event.preventDefault();

    const bookID = event.target.getAttribute("data-id");

    const targetBook = this.state.results.find((book) => book.id === bookID);

    if (!targetBook) {
      toast.warn("Book not found in search results.", { autoClose: 500 });
      return;
    }

    // Check if the bookID already exists in savedBookIds
    if (this.state.savedBookIds.includes(bookID)) {
      toast.warn("You've already saved that book.", { autoClose: 500 });
      return;
    }

    const newBook = {
      title: targetBook.volumeInfo.title,
      authors: targetBook.volumeInfo.authors,
      description: targetBook.volumeInfo.description,
      image: targetBook.volumeInfo.imageLinks.thumbnail,
      link: targetBook.volumeInfo.infoLink,
    };

    API.saveBook(newBook)
      .then((res) => {
        // Update savedBookIds in the state with the bookID from the search results
        const updatedSavedBookIds = [...this.state.savedBookIds, bookID];
        this.setState({ savedBookIds: updatedSavedBookIds });
        saveBookIds(updatedSavedBookIds); // Save updated book IDs to local storage
        toast.success("Book saved successfully!", { autoClose: 500 });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to save the book.", { autoClose: 500 });
      });
  };

  render() {
    return (
      <>
        <Navbar />
        <div className={`container`}>
          <SearchForm
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
          />
          <div className={`container mx-auto w-full`}>
            {this.state.results.map((book) => {
              return (
                <ResultCard
                  key={book.id}
                  title={book.volumeInfo?.title}
                  id={book.id}
                  link={book.volumeInfo?.infoLink}
                  author={book.volumeInfo?.authors}
                  image={book.volumeInfo?.imageLinks?.thumbnail}
                  description={book.volumeInfo?.description}
                  saveBook={this.handleSaveBook}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Search;
