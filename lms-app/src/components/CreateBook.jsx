import React, { useEffect, useState } from "react";
import "../styles/CreateBook.css";
import { createBook, fetchById, updateBookById } from "../services/bookService";
import { useNavigate, useParams } from "react-router-dom";

const CreateBook = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [book, setBook] = useState({
    id: "",
    name: "",
    author: "",
    price: "",
    isAvailable: true,
  });

  useEffect(() => {
    id &&
      fetchById(id)
        .then((response) => {
          console.log(response.data);
          setBook({ ...book, ...response.data });
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook({
      ...book,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    id
      ? await updateBookById(book)
          .then((response) => {
            console.log(response.data);
            return response.data;
          })
          .catch((error) => {
            console.log(error);
            return error;
          })
      : await createBook(book)
          .then((response) => {
            console.log(response.data);
            return response.data;
          })
          .catch((error) => {
            console.log(error);
            return error;
          });
    navigate("/books");
  };

  return (
    <div className="form-container">
      {id ? <h2>Update Book</h2> : <h2>Add a New Book</h2>}
      <form onSubmit={handleSubmit}>
        <input type="text" value={book.id} onChange={handleChange} hidden />
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={book.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={book.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Available:</label>
          <input
            type="checkbox"
            name="isAvailable"
            checked={book.isAvailable}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          {id ? "Update Book" : "Add a New Book"}
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
