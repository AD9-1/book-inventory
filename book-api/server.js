const express = require("express");
const cors = require("cors");

const PORT = 2000;
const app = express();
app.use(express.json());
app.use(cors());
const bookRoutes = require("./routes/bookRoutes");
app.use("/books", bookRoutes);
app.use(express.static('./images'))


app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
