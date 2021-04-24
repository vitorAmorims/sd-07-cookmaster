const { ObjectId } = require('mongodb');

const notFound = 404;

const recipeExists = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    // console.log(`recipeExists: id: ${id}`);
    return res.status(notFound).json({
        message: 'recipe not found',
    });
  }
  next();
};

module.exports = recipeExists;