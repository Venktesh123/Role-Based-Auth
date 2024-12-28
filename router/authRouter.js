const express = require("express");
const router = express.Router();
const { SignUp } = require("../controllers/signUp");
const { login, logout } = require("../controllers/signIn");
router.post("/signup", SignUp);
router.post("/login", login);
router.post("/logout", logout);
module.exports = router;
