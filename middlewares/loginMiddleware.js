const { UNAUTHORIZED, OH_NO } = require('../helpers/status');

const loginMiddleware = (req, res, next) => {
  try {
    const { email, password } = req.body;
  
    if (!email || !password) { 
      return res.status(UNAUTHORIZED).json({ 
      message: 'All fields must be filled',
    }); 
  }
  } catch (err) {
    res.status(OH_NO).json({ message: 'Erro interno' });
  }
    next();
};

module.exports = loginMiddleware;