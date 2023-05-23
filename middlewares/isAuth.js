const jwt = require("../src/jwt/sign&verify");

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    const user = jwt.verify(token); 
    console.log(user);
    if (!token || !user ) return  res.redirect("/api/auth/login");
      res.render('index');
      req.user = user;
      next();
  } catch (error) {
    return res.redirect("/api/auth/login");
  }
};

module.exports = {
  isAuth,

};