const { Users } = require('../database/index');
const AppError = require('../utils/AppError');

const { CONFLICT } = require('../utils/errorStatus');

class CreateAdminUserService {
  async execute({ name, email, password }) {
    this.count += 1;
    const usersModel = new Users();
    const userAlreadyExists = await usersModel.findOne({ email });

    if (userAlreadyExists) {
      const errorMessage = 'Email already registered';

      throw new AppError(errorMessage, CONFLICT);
    }

    const userCreated = await usersModel.create({
      name,
      password,
      role: 'admin',
    });

    delete userCreated.password;
    return userCreated;
  }
}

module.exports = CreateAdminUserService;
