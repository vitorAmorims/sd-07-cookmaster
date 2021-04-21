const badRequest = 400;

const recipesCreateMiddleware = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(badRequest).send({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

module.exports = recipesCreateMiddleware;
