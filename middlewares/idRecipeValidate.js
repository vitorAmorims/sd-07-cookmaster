const { ObjectId } = require('mongodb');
const { NOT_FOUND } = require('../utils/statusCode.json');

const idRecipeValidate = (req, res, next) => {
  const { id } = req.params;
  const err = new Error();
  err.code = 'not_found';
  err.message = 'recipe not found';
  res.status(NOT_FOUND);

  if (!ObjectId.isValid(id)) {
    res.json(err);
    next(err);
    return;
  }

  next();
};

module.exports = idRecipeValidate;
