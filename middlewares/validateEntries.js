const validateEntriesMiddleware = (req, res, next) => {
  const { name, email, password } = req.body; 
  const HTTP400 = 400;
  if (!name || !email || !password) {
    return res.status(HTTP400).json({     
        message: 'Invalid entries. Try again.',
    });
  }
  next();    
};

module.exports = validateEntriesMiddleware;