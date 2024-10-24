import React, { useState } from "react";
import "./SearchBook.scss";
import axios from "axios";
const SearchBook = () => {
  const [formField, setFormField] = React.useState({
    title: "",
    author: "",
    genre: "",
  });
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [message, setMessage] = useState('');
  const handlechange = (e) => {
    setFormField({ ...formField, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    setMessage("")
    setFilteredBooks([]);
    await axios
      .post(
        "http://localhost:2000/books/searchBook",
        {
          title: formField.title,
          author: formField.author,
          genre: formField.genre,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data)
        setFilteredBooks(res.data);
      }).catch((err)=>{
        if (err.response) {
            setMessage(err.response.data.message);
          } else {
            setMessage("Something went wrong!");
          }
      });
  };
  return (
    <div className="addbook">
      <form className="addbook-form" onSubmit={handlesubmit}>
        <section className="addbook-form-section">
          <label htmlFor="title">Title :</label>
          <input
            type="text"
            value={formField.title}
            name="title"
            onChange={handlechange}
          />
        </section>
        <section className="addbook-form-section">
          <label htmlFor="author">Author :</label>
          <input
            type="text"
            name="author"
            value={formField.author}
            onChange={handlechange}
          />
        </section>
        <section className="addbook-form-section">
          <label htmlFor="genre">Genre :</label>
          <input
            type="text"
            name="genre"
            value={formField.genre}
            onChange={handlechange}
          />
        </section>
        <div>
          <button className="addbutton" type="submit">
            Search Book
          </button>
        </div>
      </form>
      {message && <div className="message">{message}</div>}
      {filteredBooks && 
       <ul className="home-ul">
        {filteredBooks?.map((book) => (
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
      </ul>}
    </div>
  );
};

export default SearchBook;
