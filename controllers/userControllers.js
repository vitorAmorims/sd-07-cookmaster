const userModels = require('../models/userModels');
const userServices = require('../services/userServices');

const SUCCESS = 200;
const CREATE = 201;
// const DELETE = 204;
// const USERERR = 404;
const SERVERERR = 500;

const Model = userModels;
const Service = userServices;

const getAllUsers = async (_req, res) => {
  try {
    const results = await Model.getAll();
    
    res.status(SUCCESS).send({ users: results });
  } catch (err) {
    console.error(err);
    res.status(SERVERERR).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
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

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = 'user';
    const { status, response } = await Service.create({ name, email, password, role });
    if (!response) {
      const result = await Model.create({ name, email, password, role });
      return res.status(CREATE).send(result);
    }
    return res.status(status).json(response);
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message });    
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.params;
    const { status, response } = await Service.update({ id, name, email, password });
    if (!response) {
      const result = await Model.update({ id, name, email, password });
      console.log(result);
      return res.status(SUCCESS).json({ id, name, email, password });
    }    
    return res.status(status).json(response);
  } catch (err) {
    console.log(err);
    res.status(SERVERERR).json({ message: err.message });    
  }
};

const deleteUser = async (req, res) => {
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
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
