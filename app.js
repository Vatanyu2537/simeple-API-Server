const express = require("express");
var cors = require("cors");
const app = express();
const port = process.env.PORT || 3000; // ใช้ PORT จาก environment หากมี หรือใช้ 3000 ถ้าไม่มี
const mysql = require("mysql2");

//--------------------------------------------------------------------------------
// create the body-parser
//--------------------------------------------------------------------------------
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// create the bcrypt
//--------------------------------------------------------------------------------
const bcrypt = require("bcrypt");
const saltRounds = 10;
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// create the jsonwebtoken
//--------------------------------------------------------------------------------
var jwt = require("jsonwebtoken");
const secret = "Fullstack-login-2024";
//--------------------------------------------------------------------------------

app.use(cors());
//--------------------------------------------------------------------------------
// create the connection to database
//--------------------------------------------------------------------------------
const connection = mysql.createConnection({
  host: "ns97.hostinglotus.net",
  user: "agmcoth_test",
  password: "123456",
  database: "agmcoth_test",
});
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// ทดสอบกราเชื่อมต่อกับ MySQL
//--------------------------------------------------------------------------------
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }

//   console.log('Connected to MySQL database');

//   // ทดสอบดึงข้อมูลจากตาราง
//   connection.query('SELECT * FROM users', (queryErr, results) => {
//     if (queryErr) {
//       console.error('Error querying MySQL:', queryErr);
//       return;
//     }

//     // แสดงผลลัพธ์
//     console.log('Query results:', results);

//     // ปิดการเชื่อมต่อ
//     connection.end((endErr) => {
//       if (endErr) {
//         console.error('Error closing MySQL connection:', endErr);
//         return;
//       }
//       console.log('MySQL connection closed');
//     });
//   });
// });
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// create API Register
//--------------------------------------------------------------------------------
app.post("/register", jsonParser, function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    // Store hash in your password DB.

    connection.execute(
      "INSERT INTO users (email, password, fname, lname, number) VALUES (?, ?, ?, ?, ?)",
      [req.body.email, hash, req.body.fname, req.body.lname],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        res.json({ status: "OK" });
      }
    );
  });
});
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// create API login
//--------------------------------------------------------------------------------
app.post("/login", jsonParser, function (req, res, next) {

  connection.execute(
    "SELECT * FROM users WHERE email=?",
    [req.body.email],
    function (err, users, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      if (users.length == 0) {
        res.json({ status: "error", message: "no user found" });
        return;
      }
      // Load hash from your password DB.
      bcrypt.compare(req.body.password, users[0].password, function (err, isLogin) {
        if(isLogin){
          var token = jwt.sign({ email: users[0].email }, secret);
          res.json({status:'ok',message:'login succes', token})
        } else {
          res.json({status:'error',message:'Login failed'})
        }
      });
    }
  );
});
//--------------------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
