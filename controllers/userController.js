const { addUserDB } = require('../models/userModel');

// const SUCCESS = 200;
const CREATED = 201;

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  const data = await addUserDB(name, email, password);
  // console.log(`data em addUser: ${data}`);
  res.status(CREATED).json(data);
};

module.exports = {
  addUser,
};
