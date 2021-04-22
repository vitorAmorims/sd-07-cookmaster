const jwt = require('jsonwebtoken');
const recipesModels = require('../models/recipesModels');

const secret = 'secret';

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const decodedToken = jwt.verify(token, secret);
    const recipe = await recipesModels.findById(id);
    if (decodedToken.data.role === 'admin') return next();

    if (recipe.userId.toString() !== decodedToken.data.id) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};