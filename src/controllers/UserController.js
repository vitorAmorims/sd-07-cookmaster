const bcrypt = require('bcrypt');
const UserService = require('../services/UserService');
const { CREATED, ERROR } = require('./status');

module.exports = {
  create: async (req, res) => {
    try {
      const { name, email } = req.body;

      const salt = bcrypt.genSaltSync(5);
      const securePassword = bcrypt.hashSync(req.body.password, salt);

      const { password, _id, ...user } = await UserService.create(name, email, securePassword);
      
      return res.status(CREATED).json({ user });
    } catch (error) {
      return res.status(ERROR).json({ message: 'An internal error has occurred' });
    }
  },
};
