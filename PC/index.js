const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.end("Welcome to HOmepae");
});

app.get("/products", (req, res) => {
  res.send([1, 2, 3]);
});

app.listen(8080, () => {
  console.log("Server started at localhost:8080");
});
