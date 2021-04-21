const validator = require('email-validator');

module.exports = (req, res, next) => {
  const { name, email } = req.body;
  const emailValid = validator.validate(email);
  
  if (!name || !email || !emailValid) {
    return res.status(400)
        .send({ message: 'Invalid entries. Try again.' }); 
  }
  
  next();
};
