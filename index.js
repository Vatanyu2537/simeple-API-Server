const express = require('express');
const app = express();
const port = process.env.PORT || 3000;  // ใช้ PORT จาก environment หากมี หรือใช้ 3000 ถ้าไม่มี

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
