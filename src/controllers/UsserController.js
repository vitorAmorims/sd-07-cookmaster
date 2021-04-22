const UserService = require('../services/UserService');
const { CREATED, ERROR } = require('./status');

module.exports = {
  create: async (req, res) => {
    try {
      const user = await UserService.create(req.body);
      return res.status(CREATED).json({ user });
    } catch (error) {
      return res.status(ERROR).json({ message: 'An internal error has occurred' });
    }
  },
};
