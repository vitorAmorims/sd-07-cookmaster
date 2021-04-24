const unauthorized = 401;

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(`validateLogin: name : ${name}`);
  if (!email || !password) {
    return res.status(unauthorized).json({
      message: 'All fields must be filled',
    });
  }
  next();
};

module.exports = validateLogin;