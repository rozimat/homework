require('dotenv').config();
const express = require("express");
const cookie = require('cookie-parser');
const fileUpload = require('express-fileupload');
const routes = require("./routes");
const { isAuth } = require('../middlewares/isAuth');
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
app.use(cookie());
app.use(express.static(process.cwd() + "/uploads"));
app.use(express.static(process.cwd() + "/videos"));
app.set('view engine', 'ejs');
app.use(isAuth)
app.use(routes);




app.listen(5000, ()=>{
  console.log(5000);
})