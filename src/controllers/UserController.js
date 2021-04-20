const userService = require('../services/UserService');

module.exports = {
  async create(request, response) {
    const user = request.body;
    const result = await userService.create(user);
    if (result === null) {
      return response.status(409).json({ message: 'Email already registered' });
    }
    return response.status(201).json({ user: result });
  },
}