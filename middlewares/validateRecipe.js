const badRequest = 400;

const validateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  // console.log(`validateRecipe: name : ${name}`);
  // Arrumar aqui a validação do email
  if (!name || !ingredients || !preparation) {
    return res.status(badRequest).json({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

module.exports = validateRecipe;
