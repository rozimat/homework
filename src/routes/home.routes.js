
const router = require("express").Router();
const { home } = require('../controller/home.controller');

router.get("/", home);





module.exports = router;