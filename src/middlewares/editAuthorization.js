const { ObjectId } = require('mongodb');
const { StatusCodes } = require('http-status-codes');
const recipesModel = require('../models/recipesModel');

const editAuthorization = async (req, res, next) => {
  const { id } = req.params;
  const { _id, role } = req.user;
  
  if (role === 'admin') return next();

  const search = await recipesModel.searchById(ObjectId(id));

  if (search === null) res.status(StatusCodes.NOT_FOUND).send({ message: 'recipe not found' });

  if (search.userId.toString() !== _id.toString()) {
    return res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Você não é o autor da receita.' });
  }

  next();
};

module.exports = editAuthorization;
