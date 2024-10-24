import axios from "axios";
import React, { useEffect } from "react";
import "./Home.scss";
const Home = () => {
  const [books, setBooks] = React.useState([]);
  const fetchBooks = async () => {
    await axios
      .get("http://localhost:2000/books")
      .then((res) => res.data)
      .then((books) => setBooks(books))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  console.log(books);
  return (
    <div className="home">
      <h1>Book List</h1>
      <ul className="home-ul">
        {books?.map((book) => (
          <li key={book.Entry_id} className="home-ul-li">
            <div className="bookImage">
              <img src={`http://localhost:2000/${book.BookImage}`} />
            </div>
            <p className="author">
              {book.Title} by {book.Author}
            </p>
            <p className="genre">{book.Genre}</p>
            <p className="pubdate">
              <span className="pubdate-span">Pub-Date:</span> {new Date(book.Publication_Date).toISOString().split("T")[0]}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
