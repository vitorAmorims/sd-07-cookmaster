const jwt = require('jsonwebtoken');
const RecipeModel = require('../models/RecipeModel');

const SECRET_PASS = 'marcelodossantos';

const authenticationJwt = async (req, res, next) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  try {
    const { _id, role } = jwt.verify(authorization, SECRET_PASS);
    const user = await RecipeModel.findById(id);
  
    if (user.userId === _id || role === 'admin') {
      return next();
    }
    
    return res.status(401).json({ message: 'missing auth token' });
  } catch (error) {
    res.status(500).json({ Internal_error: error.message });      
  }
};

module.exports = authenticationJwt;
