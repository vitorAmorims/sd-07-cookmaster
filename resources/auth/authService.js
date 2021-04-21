const cryptography = require('../../helpers/cryptography');

const { service: userService } = require('../user');

const login = async (email, password) => {
  try {
    const foundUser = await userService.findByEmail(email);
    const isMatch = foundUser.password === password;/* cryptography.cryptCompare(password, foundUser.password); */
    if (!isMatch) {
      throw new Error();
    }

    const { _id: id } = foundUser;
    return cryptography.generateUserToken(email, id);
  } catch (error) {
    throw new Error('Incorrect username or password');
  }
};

module.exports = {
  login,
};