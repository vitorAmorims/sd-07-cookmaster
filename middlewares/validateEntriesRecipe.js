const validateEntriesRecipeMiddleware = (req, res, next) => {
  const { name, ingredients, preparation } = req.body; 
  const HTTP400 = 400;
  if (!name || !ingredients || !preparation) {
    return res.status(HTTP400).json({     
        message: 'Invalid entries. Try again.',
    });
  }
  next();    
};

module.exports = validateEntriesRecipeMiddleware;