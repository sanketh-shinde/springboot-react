import { useEffect, useState } from "react";
import { createBook, fetchById, updateBookById } from "../services/bookService";
import { useNavigate, useParams } from "react-router-dom";

import "../styles/CreateBook.css";

const CreateBook = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [book, setBook] = useState({
    id: "",
    name: "",
    author: "",
    price: "",
    available: true,
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
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook((prevBook) => {
      const updatedBook = {
        ...prevBook,
        [name]: type === "checkbox" ? checked : value,
      };
      return updatedBook;
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
    <>
      <div className="form-container">
        <h2>{id ? "Update Book" : "Add a New Book"} </h2>
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
              name="available"
              checked={book.available}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-button">
            {id ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBook;
