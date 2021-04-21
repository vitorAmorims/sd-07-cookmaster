const user = require('../services/user');

const CREATED = 201;
const BAD_REQUEST = 400;
const CONFLICT = 409;
const create = async (req, res) => {
  const { email, password, name } = req.body;

  const result = await user.create(email, password, name);

  if (result.message) return res.status(BAD_REQUEST).json(result);

  if (result.conflict) return res.status(CONFLICT).json({ message: 'Email already registered' });

  res.status(CREATED).json(result);
};

module.exports = {
  // deleteProduct,
  // updateById,
  // getAll,
  // findById,
  create,
};
