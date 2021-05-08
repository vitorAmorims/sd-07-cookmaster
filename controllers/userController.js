const service = require('../services/userService');

const createUser = async (request, response) => {
    try {
      const { name, email, password } = request.body;
    
    const user = {
      name,
      email,
      password,
    };

    return response.status(201).json(await service.createUser(user));
    } catch (error) {
      return response.status(500).json({ message: 'Erro interno', error });
    }
};

module.exports = {
  createUser,
};