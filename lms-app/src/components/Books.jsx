import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooksRequest } from "../features/book/bookSlice";

import "../styles/Books.css";
import { user } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const navigate = useNavigate();
  const userDetails = user();
  const role = userDetails.userDTO.roles;
  const { books, isLoading, bookError } = useSelector((state) => state.book);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooksRequest());
  }, [dispatch]);

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
          <ul className="books-list">
            {books.map((book) => (
              <li key={book.id} className="book-item">
                <h2 className="book-title">{book.name}</h2>
                <p className="book-author">{book.author}</p>
                <p className="book-price">Rs. {book.price}</p>
                <div className="book-actions">
                  <button
                    className="update-btn"
                    onClick={() => navigate(`/books/update/${book.id}`)}
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
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h1 className="no-books">No Books Available</h1>
      )}
    </>
  );
};

export default Books;
