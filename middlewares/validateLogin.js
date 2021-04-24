const validateLoginMiddleware = async (req, res, next) => {
  const { email, password } = req.body;   
  const HTTP401 = 401;
  const quatro = 4;

  if (!email || !password) {
    return res.status(HTTP401).json({     
        message: 'All fields must be filled',
    });
  }

  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!regex.test(email) || password.length < quatro) {
    return res.status(HTTP401).json({     
        message: 'Incorrect username or password',
    });
  }
  next();
};

module.exports = validateLoginMiddleware;