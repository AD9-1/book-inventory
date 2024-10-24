const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const filename =
      file.originalname.replace(fileExt, "").split(" ").join("") + fileExt;
    console.log(filename);
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
router.route("/").get(async (req, res) => {
  try {
    const books = await knex("book_inventory").select();
    return res.json(books);
  } catch (err) {
    res.status(404).json({ message: "error retrieving books" });
  }
});

router.post("/addBook", upload.single("BookImage"), async (req, res) => {
  const { author, title, isbn, genre, pub_date } = req.body;
  console.log(req.body);
  if (req.file == "" || !req.file) {
    return res.status(406).json({ message: "The Book image is required" });
  } else if (
    !author ||
    !title ||
    !isbn ||
    !genre ||
    !pub_date ||
    pub_date == "" ||
    genre == "" ||
    author == "" ||
    title == "" ||
    isbn == ""
  ) {
    return res.status(404).json({ message: "Fields cannot be empty" });
  } else if (isbn.length !== 17) {
    return res.status(401).json({ message: "Invalid ISBN" });
  }

  // Validate ISBN format (assuming format "xxx-x-xx-xxxxxx-x")
  const isbnArr = isbn.split("-");
  if (
    isbnArr[0].length != 3 ||
    isbnArr[1].length != 1 ||
    isbnArr[2].length != 2 ||
    isbnArr[3].length != 6 ||
    isbnArr[4].length != 1
  ) {
    return res.status(400).json({ message: "Invalid format in ISBN" });
  }

  try {
    const books = await knex("book_inventory").select();
    const existingBook = books.find((book) => book.ISBN === isbn);
    if (existingBook) {
      return res.status(405).json({ message: "Book already exists" });
    }

    // Insert the new book record into the database
    await knex("book_inventory").insert({
      Title: title,
      Author: author,
      Genre: genre,
      Publication_Date: new Date(pub_date),
      ISBN: isbn,
      BookImage: req.file.filename,
    });

    return res.status(201).json({ message: "Book added successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/searchBook", async function (req, res) {
  const { title, author, genre, isbn } = req.body;
  if (!title && !author && !genre && !isbn) {
    return res.status(404).send({ message: "Please enter atleast one field" });
  }

  let query = knex("book_inventory");

  if (title) {
    query = query.where("Title", "like", `%${title}%`);
  }

  if (author) {
    query = query.where("Author", "like", `%${author}%`);
  }

  if (genre) {
    query = query.where("Genre", "like", `%${genre}%`);
  }

  if (isbn) {
    query = query.where("ISBN", "like", `%${isbn}%`);
  }
  try {
    // Execute the query
    const findbook = await query;

    if (findbook.length === 0) {
      return res.status(404).send({ message: "No book found" });
    } else {
      return res.status(200).send(findbook);
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
