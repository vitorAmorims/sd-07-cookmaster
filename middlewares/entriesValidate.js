const { BAD_REQUEST } = require('../utils/statusCode.json');

const nameValidate = (req, res, next) => {
  const { name, email, password } = req.body;
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  if (!name || !email || !password || !emailRegex.test(email)) {
    return res.status(BAD_REQUEST)
      .json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

module.exports = nameValidate;
