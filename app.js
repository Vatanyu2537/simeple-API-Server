const express = require('express');
var cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;  // ใช้ PORT จาก environment หากมี หรือใช้ 3000 ถ้าไม่มี
const mysql = require('mysql2');

app.use(cors());
//--------------------------------------------------------------------------------
// create the connection to database
//--------------------------------------------------------------------------------
const connection = mysql.createConnection({
    host: 'ns97.hostinglotus.net',
    user: 'agmcoth_test',
    password:'123456',
    database: 'agmcoth_test'
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

app.post('/register', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
