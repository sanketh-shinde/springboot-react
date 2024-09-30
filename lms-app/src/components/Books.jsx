import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, fetchBooksRequest } from "../features/book/bookSlice";
import { user } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { deleteBookById } from "../services/bookService";

import "../styles/Books.css";

const Books = () => {
  const navigate = useNavigate();
  const userDetails = user();
  const { roles: role, isAvailable } = userDetails.userDTO;
  const { books, isLoading, bookError } = useSelector((state) => state.book);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooksRequest());
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteBookById(id)
      .then((response) => {
        console.log(response.data);
        dispatch(deleteBook(id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {role === "ROLE_ADMIN" && (
        <div className="button-container">
          <button
            onClick={() => navigate("/books/create-book")}
            className="add-book-btn"
          >
            Add Book
          </button>
        </div>
      )}
      {isLoading && <p className="loading-text">Loading...</p>}
      {!isLoading && bookError ? (
        <p className="error-text">{bookError}</p>
      ) : null}
      {!isLoading && books ? (
        <div className="books-container">
          <h1 className="books-header">Book List</h1>
          <div className="books-grid">
            {books.map((book) => (
              <div key={book.id} className="book-item">
                <h2 className="book-title">{book.name}</h2>
                <p className="book-author">{book.author}</p>
                <p className="book-price">Rs. {book.price}</p>
                <p>{!isAvailable ? "Available" : "Not Available"}</p>
                {role === "ROLE_ADMIN" && (
                  <div className="book-actions">
                    <button
                      className="update-btn"
                      onClick={() => navigate(`/books/update-book/${book.id}`)}
                    >
                      Update
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1 className="no-books">No Books Available</h1>
      )}
    </>
  );
};

export default Books;
