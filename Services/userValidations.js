const { searchEmail } = require("../Models/usersModel");

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const formatEmail = (email) => {
  const emailReg = /\S+@\S+\.\S+/;
  return emailReg.test(email);
}

const userDataNotOk = (name, email, password) => {
  if(!name || !email || !password) 
  return true;
};

const emailValidation = (email) => {
  if(!formatEmail(email)) return err = {
    response: {err: { 
      'message': "Invalid entries. Try again." 
    }},
  }
  return true;
}

const userValidationMidd = async (req, res, next) => {
  const { name, email, password } = req.body;
  const emailOk = (email) => formatEmail(email);
  if(userDataNotOk(name, email, password) || !emailOk(email)) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }
  if(await searchEmail(email)) {
    return res.status(409).json({
      message: 'Email already registered',
    });
  }
  next()
};

module.exports = {
  emailValidation,
  userValidationMidd
}
