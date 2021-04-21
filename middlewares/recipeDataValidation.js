const status = require('../httpStatusCodes');

const userDataValidation = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(status.BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

module.exports = userDataValidation;
