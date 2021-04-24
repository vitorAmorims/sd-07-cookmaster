const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const { REQUEST_CREATED, REQUEST_OK,
  INTERNAL_SERVER_ERROR, /* UNPROCESSABLE_ENTITY, */ UNAUTHORIZED } = require('../http');
const usersModel = require('../models/usersModel');

const secret = 'trybe';

const createUser = async (request, response) => {
  try {
    const { name, email, password, role } = request.body;
    const salt = bcrypt.genSaltSync(5);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    const results = await usersModel.registerUser(name, email, encryptedPassword, role);
    response.status(REQUEST_CREATED).json({ user: results });
  } catch (error) {
    response.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const signIn = async (request, response) => {
  try {
    const { email, password } = request.body;
    const results = await usersModel.findUserByEmailAddress(email);
    if (!results) throw new Error('Incorrect username or password');

    const isMatch = bcrypt.compareSync(password, results.password);
    if (!isMatch) throw new Error('Incorrect username or password');

    const jwtConfig = { expiresIn: 60 * 5, algorithm: 'HS256' };
    const token = jwt.sign({ data: results.email }, secret, jwtConfig);
    response.status(REQUEST_OK).json({ token });
  } catch (error) {
    response.status(UNAUTHORIZED).json({ message: error.message });
  }
};

/* const findAll = async (_request, response) => {
  try {
    const results = await productsModel.findAllProducts();
    response.status(REQUEST_OK).json({ products: results });
  } catch (error) {
    response.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}; */

/*
const updateOne = async (request, response) => {
  try {
    const { id } = request.params;
    const { name, quantity } = request.body;
    const results = await productsModel.updateProduct(id, name, quantity);
    response.status(REQUEST_OK).json(results);
  } catch (error) {
    response.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
};

const deleteOne = async (request, response) => {
  try {
    const { id } = request.params;
    const results = await productsModel.deleteProduct(id);
    response.status(REQUEST_OK).json(results);
  } catch (error) {
    response.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
}; */

module.exports = {
  createUser,
  signIn,
};
