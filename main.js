// server.js

const express = require('express');
const app = express();
app.use(express.json());

const { registerUser } = require('./usercontroller');

app.post('/register', async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    const newUser = await registerUser(username, password, email, role);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "ไม่สามารถลงทะเบียนผู้ใช้ได้" });
  }
});

app.listen(3000, () => {
  console.log('เซิร์ฟเวอร์ทำงานที่พอร์ต 3000');
});
