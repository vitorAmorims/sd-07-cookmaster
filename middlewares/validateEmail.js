const connection = require('../config/conn');

const HTTP409 = 409;
const HTTP400 = 400;

const duplicatedEmail = async (email) =>     
   connection().then((db) => db.collection('users').findOne({ email }));
   
const validateEmailMiddleware = async (req, res, next) => {
  const { email } = req.body;
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!regex.test(email)) {
    return res.status(HTTP400).json({     
        message: 'Invalid entries. Try again.',
    });
  }
  
  const emailExists = await duplicatedEmail(email);
  if (emailExists) {
    return res.status(HTTP409).json({     
        message: 'Email already registered',
    });
  }
  next();    
};

module.exports = validateEmailMiddleware;