const {
  BAD_REQUEST,
} = require('../controllers/statusCode');

const entriesMessage = {
  message: 'Invalid entries. Try again.',
};

const recipesName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    res.status(BAD_REQUEST).json(entriesMessage);
  }
  next();
};

const recipesIngredients = (req, res, next) => {
  const { ingredients } = req.body;

  if (!ingredients || ingredients === '') {
    res.status(BAD_REQUEST).json(entriesMessage);
  }

  next();
};

const recipesPreparation = (req, res, next) => {
  const { preparation } = req.body;
  if (!preparation || preparation === undefined) {
    res.status(BAD_REQUEST).json(entriesMessage);
  }
  next();
};

module.exports = {
  recipesName,
  recipesIngredients,
  recipesPreparation,
};
