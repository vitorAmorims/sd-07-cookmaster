const { connect } = require('./model');

module.exports = {
  async create(user) {
    const userCreated = await connect('users', 'insertOne', user);
    return userCreated.ops[0];
  },
  async findByEmail(email) {
    const userByEmail = await connect('users', 'findOne', { email });
    return userByEmail;
  },
};
