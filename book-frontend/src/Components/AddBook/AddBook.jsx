import React, { useRef, useState } from "react";
import "./AddBook.scss";
import axios from "axios";
const AddBook = () => {
  const [formField, setFormField] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    date: null,
    BookImage: null,
  });
  const [message, setMessage] = useState();
  const formRef = useRef();
  const handlechange = (e) => {
    if (formRef.current[e.target.name].style.border === "1.5px solid red") {
      formRef.current[e.target.name].style.border = "";
    }
    setFormField({
      ...formField,
      [e.target.name]:
        e.target.type == "file" ? e.target.files[0] : e.target.value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", formField.title);
    formData.append("author", formField.author);
    formData.append("genre", formField.genre);
    formData.append("isbn", formField.isbn);
    formData.append("pub_date", formField.date);
    formData.append("BookImage", formField.BookImage);
    try {
      const response = await axios.post(
        "http://localhost:2000/books/addBook",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      if (response.status === 201) setMessage(response.data.message);
    } catch (err) {
      console.error(err);
      if (err.response) {
        if (err.response.status === 404) {
          console.log(Array.from(formRef.current));
          Array.from(formRef.current).forEach((data) => {
            console.log(data.value);
            if (data.tagName === "INPUT" && data.type != "file" && !data.value)
              return (data.style.border = "1.5px solid red");
          });
        }
        if (err.response.status === 400 || err.response.status === 401) {
          formRef.current.isbn.style.border = "1.5px solid red";
        }
        setMessage(err.response.data.message);
      } else {
        setMessage("Something went wrong!");
      }
    }
  };
  return (
    <div className="addbook">
      <form className="addbook-form" onSubmit={handlesubmit} ref={formRef}>
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
        <section className="addbook-form-section">
          <label htmlFor="isbn">ISBN :</label>
          <input
            type="text"
            name="isbn"
            value={formField.isbn}
            onChange={handlechange}
          />
        </section>
        <section className="addbook-form-section">
          <label htmlFor="pubDate">Publication Date :</label>
          <input
            type="date"
            name="date"
            value={formField.pubDate}
            onChange={handlechange}
          />
        </section>
        <section className="addbook-form-section">
          <input
            type="file"
            className="bookimage"
            onChange={handlechange}
            name="BookImage"
          />
        </section>
        <div>
          <button className="addbutton" type="submit">
            Add Book
          </button>
        </div>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default AddBook;
