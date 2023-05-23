const jwt = require('jsonwebtoken');

const verify = (payload)=> jwt.verify(payload, process.env.SECRET_KEY );
const sign = (payload)=> jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 123464554*115 });



module.exports = {
  verify,
  sign
}