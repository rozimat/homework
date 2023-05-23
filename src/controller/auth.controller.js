const bcrypt = require("bcrypt");
const { v4 :uuid } = require("uuid");
const jwt = require("../jwt/sign&verify");
const Joi = require("joi");
const Io = require('../utils/io');
const UsersData = new Io('./databases/users.json');
const Users = require('../models/Users');

const login = async (req, res) => {
    const { username, password } = req.body;

    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });

    const {error} = schema.validate({username, password});
    if (error){
      return res.render("/api/auth/login");
    }

    const users = await  UsersData.read();

    const findUser = users.find((user) => user.username === username);
     const solve = await bcrypt.compare(password, findUser.password);
    if (!findUser || !solve){
     return  res.redirect("/api/auth/login") ;
    }
    else{
      const token = jwt.sign({ id : newUser.id});
      res.cookie("token", token, {
        maxAge: 8640000,
      });
      res.redirect('/');
    
    }
    
}

const register = async (req, res) => {
  try {
  const usersData = await UsersData.read();
  const { username, password, name } = req.body;


  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  });
  const {error} = schema.validate({username, password, name});

  if (error) return res.redirect("/api/auth/register");


  const findUser = usersData.find(( user) => user.username === username);

  if (findUser) {
    res.redirect('/api/auth/register');
    res.status(403).json({ message: "User already existed!"});
    
  }
  else{
    const { img } = req.files;
    const id = uuid();
   
    const hashedPassword = await bcrypt.hash(password, 12);
    const imgName = `${uuid()}.${img.mimetype.split("/")[1]}`;
    img.mv(`${process.cwd()}/uploads/${imgName}`);
    const newUser = new Users(id, username, hashedPassword, name, imgName);
    const data = usersData.length ? [...usersData , newUser] : [newUser];
    const token = jwt.sign({ id : newUser.id});
    res.cookie("token", token, {
      maxAge: 8640000,
    });
    await UsersData.write(data);
   
    res.redirect('/');
    res.status(201).json({ message: "succsesss"})
   }
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  login,
  register,
  
}