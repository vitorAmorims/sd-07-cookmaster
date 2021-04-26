const BADREQUEST = 400;
const INVALIDENTRIES = 'Invalid entries. Try again.';

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(BADREQUEST).send({
      message: INVALIDENTRIES });
  }
  next();
};

const validateIngredients = (req, res, next) => {
  const { ingredients } = req.body;
  if (!ingredients) {
    return res.status(BADREQUEST).send({
      message: INVALIDENTRIES });
  }
  next();
};

const validatePreparation = (req, res, next) => {
  const { preparation } = req.body;
  if (!preparation) {
    return res.status(BADREQUEST).send({
      message: INVALIDENTRIES });
  }
  next();
};

module.exports = {
  validateName, validateIngredients, validatePreparation,
};