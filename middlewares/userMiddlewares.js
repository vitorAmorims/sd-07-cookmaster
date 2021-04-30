const jwt = require('jsonwebtoken');

const userModels = require('../models/userModels');
const recipeModels = require('../models/recipeModels');

const SECRET = 'MASTERSKYWALKERISJEDI';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token && typeof token !== 'string') {
      return res.status(401).send({ message: 'jwt malformed' });
    }
    const { _id } = jwt.verify(token, SECRET);
    const user = await userModels.getById(_id);
    if (!user) {
      return res.status(401).send({ message: 'Erro ao procurar o usuário do token.' });
    }
    req.body.userId = _id;
    next();
    return;
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const especificAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const idReceita = req.params.id;
    if (!token) {
      return res.status(401).send({ message: 'missing auth token' });
    }
    const { _id, role } = jwt.verify(token, SECRET);
    if (role === 'admin') return next();
    const recipe = await recipeModels.getById(idReceita);
    if (recipe.userId.toString() !== _id) {
      return res.status(401).send({ message: 'jwt malformed' });
    }
    next();
    return;
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { auth, especificAuth };
