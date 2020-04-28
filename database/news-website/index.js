const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "22031379",
  database: "news_portal",
});

db.connect();

app.get("/article", (req, res) => {
  let newQuery = "SELECT * FROM article";
  db.query(newQuery, (err, result) => {
    res.json(result);
    console.log(result);
  });
});

app.listen(3001, () => {
  console.log("Server is running at port 3001");
  console.log("Connected to the dabase");
});
