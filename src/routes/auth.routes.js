const { Router } = require("express");
const router = Router();

const { login, register } = require('../controller/auth.controller');

router.post('/api/auth/login', login)
router.get("/api/auth/login", (req, res) => {
  res.render("login");
});
router.post('/api/auth/register', register)
router.get("/api/auth/register", (req, res) => {
  res.render("register");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/api/auth/login");
});


module.exports = router;