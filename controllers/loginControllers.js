const loginModels = require('../models/loginModels');
const loginServices = require('../services/loginServices');

const SUCCESS = 200;
// const CREATE = 201;
// const DELETE = 204;
// const USERERR = 404;
const SERVERERR = 500;

const Model = loginModels;
const Service = loginServices;

const getAllLogins = async (_req, res) => {
  try {
    const results = await Model.getAll();
    
    res.status(SUCCESS).send({ products: results });
  } catch (err) {
    console.error(err);
    res.status(SERVERERR).json({ message: err.message });
  }
};

const getLoginById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response } = await Service.getById(id);
    if (!response) {
      const result = await Model.getById(id);
      return res.status(SUCCESS).send(result);
    }
    return res.status(status).send(response);
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message });
  }
};

const createLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { status, response, token } = await Service.create({ email, password });
    if (!response) {
      const result = await Model.create({ email, token });
      return res.status(SUCCESS).send(result);
    }
    return res.status(status).json(response);
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message });    
  }
};

const updateLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { id } = req.params;
    const { status, response } = await Service.update({ id, email, password });
    if (!response) {
      const result = await Model.update({ id, email, password });
      console.log(result);
      return res.status(SUCCESS).json({ id, email, password });
    }    
    return res.status(status).json(response);
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message });    
  }
};

const deleteLogin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response } = await Service.exclude(id);
    if (!response) {
      await Model.exclude(id);
      return res.status(SUCCESS).end();
    }
    return res.status(status).json(response);
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message });
  }
};

module.exports = {
  getAllLogins,
  getLoginById,
  createLogin,
  updateLogin,
  deleteLogin,
};
