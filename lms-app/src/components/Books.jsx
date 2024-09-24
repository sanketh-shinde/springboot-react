import { useEffect, useState } from "react";
import getAllBooks from "../services/bookService";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAllBooks()
      .then((response) => {
        // console.log(response.data);
        setBooks(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {books.map((book) => (
        <ul key={book.id}>
          <li>
            <h2>{book.name}</h2>
            <p>{book.author}</p>
            <p>{book.price}</p>
          </li>
        </ul>
      ))}
    </>
  );
};

export default Books;
