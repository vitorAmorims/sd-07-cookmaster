const validation = require('../validation');

const loginMiddleware = async (req, res, next) => {
  const { email, password } = req.body;

  if (validation.emailPassInvalid(email, password)) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  const isValid = await validation.userValidation(email, password);
  
  if (isValid) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
    
  next();
};

module.exports = loginMiddleware;
