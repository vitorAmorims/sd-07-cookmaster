const userService = require('../services/userService');

// const OK = 200;
const CREATE = 201;
// const UNPROCESS = 422;
const BAD_REQUEST = 400;
const CONFLICT = 409;

const add = async (req, res) => {
  try {
    const results = await userService.add(req.body);

    res.status(CREATE).json(results);
  } catch (error) {
    console.error(error);
    let response = BAD_REQUEST;
    const { message } = error;
    if (message.includes('Email')) {
      response = CONFLICT;
    }
    res.status(response).json({ message: error.message });
  }
};
/*
const objError = {
  err: {
    code: 'invalid_data',
    message: ''
  }
};

const getAll = async (_req, res) => {
  try {
    const results = await productsModel.getAll();

    res.status(OK).json({ products: results });
  } catch (error) {
    console.error(error);
    res.status(ERROR).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsService.getById(id);

    res.status(OK).json(result);
  } catch (error) {
    console.error(error);

    const { message } = error;
    if (message.includes('id')) {
      objError.err.message = error.message;
      res.status(UNPROCESS).json(objError);
    }
    res.status(ERROR).json({ message: error.message });
  }
};

const add = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const results = await productsService.add(name, quantity);

    res.status(CREATE).json(results);
  } catch (error) {
    console.error(error);

    const { message } = error;
    if (message.includes('quantity')
    || message.includes('name') || message.includes('Product')) {
      objError.err.message = error.message;
      res.status(UNPROCESS).json(objError);
    }
    res.status(ERROR).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const result = await productsService.update(id, name, quantity);

    res.status(OK).json(result);
  } catch (error) {
    console.error(error);

    const { message } = error;
    if (message.includes('quantity')
    || message.includes('name') || message.includes('Product')) {
      objError.err.message = error.message;
      res.status(UNPROCESS).json(objError);
    }
    res.status(ERROR).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsService.deleteProduct(id);

    res.status(OK).json(result);
  } catch (error) {
    console.error(error);

    const { message } = error;
    if (message.includes('id')) {
      objError.err.message = error.message;
      res.status(UNPROCESS).json(objError);
    }
    res.status(ERROR).json({ message: error.message });
  }
}; */

module.exports = {
  add,
};
