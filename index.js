const { response } = require("express");
const express = require("express");
const mysql = require("mysql");
let port = process.env.PORT || 3000;
const app = express();

// Create connection
const db = mysql.createConnection({
  host: "muncakappdb.cezbagek1d6x.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "c3p4tc0ps",
  database: "muncakappdb",
});
db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("MYSQL IS CONNECTED ✅");
  }
});

// PORT

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});


app.get("/", (req, res)=>{
  res.send("Hello World!")
})

// Create Database
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE muncakappdb";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log("Mysql Database created! 🍭", result);
    }
  });
});

// Create Table
app.get("/createpoststable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts table created");
  });
});

// Insert Post 1
app.get("/addpost1", (req, res) => {
  let post = {
    title: "Post one",
    body: "This is the first post, thankyou very much for reading this post",
  };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts table created!");
  });
});

// Selectpost
app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// Selectpost
app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts fetched");
  });
});

// Update Post
app.get("/updatepost/:id", (req, res) => {
  let newTitle = "Updated Title";
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Post ${req.params.id} Updated`);
  });
});

// Delete Post
app.get("/deletepost/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Post ${req.params.id} Deleted`);
  });
});

 
// Selectpost
app.get("/getSeller/:id", (req, res) => {
  let sql = `SELECT * FROM sellers WHERE id_seller = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
