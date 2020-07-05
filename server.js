const express = require("express");
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 5000;


// Connect Database

connectDB();

app.get("/", (req, res) => res.send("Api Running"));

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
