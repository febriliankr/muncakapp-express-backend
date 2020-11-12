const { response } = require("express");
const express = require("express");
const mysql = require("mysql");
let port = process.env.PORT || 3000;
const app = express();

// Create connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
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

app.get("/", (req, res) => {
  res.send("Muncak App REST API");
});

// Create Database
// app.get("/createdb", (req, res) => {
//   let sql = "CREATE DATABASE muncakappdb";
//   db.query(sql, (err, result) => {
//     if (err) {
//       throw err;
//     } else {
//       console.log("Mysql Database created! 🍭", result);
//     }
//   });
// });

// // Create Table
// app.get("/createpoststable", (req, res) => {
//   let sql =
//     "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send("Posts table created");
//   });
// });

// Sellers CRUD OF MUNCAK APP

// Selectpost
app.get("/getSellers", (req, res) => {
  let sql = "SELECT * FROM sellers";
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// READ ID
app.get("/getSeller/:id", (req, res) => {
  let sql = `SELECT * FROM sellers WHERE id_seller = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// DELETE
app.get("/deleteSeller/:id", (req, res) => {
  let sql = `DELETE FROM sellers WHERE id_seller = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Seller ${req.params.id} Deleted`);
  });
});

// CREATE
app.post("/addSeller", (req, res) => {
  const {
    nama_seller,
    tgllahir_seller,
    kota_seller,
    alamat_seller,
    nohp_seller,
    gender_seller,
    email_seller,
    username_seller,
    password_seller,
  } = req.body;

  const sql = `INSERT INTO sellers ( nama_seller, tgllahir_seller, kota_seller, alamat_seller, nohp_seller, gender_seller, email_seller, username_seller, password_seller)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  let query = db.query(
    sql,
    nama_seller,
    tgllahir_seller,
    kota_seller,
    alamat_seller,
    nohp_seller,
    gender_seller,
    email_seller,
    username_seller,
    password_seller,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    }
  );
});

// UPDATE
app.post("/updateSeller/:id", (req, res) => {
  const sellerId = req.params.id;
  const { credential, newValue } = req.body;
  let sql = `UPDATE sellers SET ? = ? WHERE id = ?`;
  let query = db.query(sql, credential, newValue, sellerId, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Post ${req.params.id} Updated`);
  });
});
