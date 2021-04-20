const user = require('../Service/user');

const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await user.create(name, email, password);
    res.status(201).json({ user: result });
  } catch (error) {
    if (error.message.includes('Email')) return res.status(409).json(error);
    res.status(400).json(error);
  }
};

module.exports = {
  create,
};