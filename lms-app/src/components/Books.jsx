import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooksRequest } from "../features/book/bookSlice";

import "../styles/Books.css";
import { user } from "../services/authService";

const Books = () => {
  const userDetails = user();
  const { books, isLoading, bookError } = useSelector((state) => state.book);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooksRequest());
  }, [dispatch]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && bookError ? <p>{bookError}</p> : null}
      {!isLoading && books ? (
        <div className="books-container">
          <h1>Book List</h1>
          <ul className="books-list">
            {books.map((book) => (
              <li key={book.id} className="book-item">
                <h2 className="book-title">{book.name}</h2>
                <p className="book-author">{book.author}</p>
                <p className="book-price">Rs. {book.price}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h1>No Books Available</h1>
      )}
    </>
  );
};

export default Books;
