const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const dbConnect = require("./config/dbConnection");
const authMiddleware = require("./middleware/authMiddleware");
app.use(express.json());
const authrouter = require("./router/authRouter");
const PORT = process.env.PORT || 5000;

dbConnect();
app.use("/api/auth", authrouter);
app.get("/", (req, res) => {
  res.send("<h1>Server is working</h1>");
});

app.use(authMiddleware);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Eroor in running server ${PORT}`);
    return;
  } else {
    console.log(`Server is running on port ${PORT}`);
    return;
  }
});
