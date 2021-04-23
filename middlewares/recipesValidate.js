const { BAD_REQUEST } = require('../utils/statusCode.json');

const recipesValidate = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    const err = new Error();
    err.message = 'Invalid entries. Try again.';
    res.status(BAD_REQUEST).json(err);
    return next(err);
  }
  next();
};

module.exports = recipesValidate;
