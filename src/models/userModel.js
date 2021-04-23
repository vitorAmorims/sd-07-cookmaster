const { connect } = require('./model');

module.exports = {
  create: async (user) => {
    const userCreated = await connect('users', 'insertOne', user);
    return userCreated.ops[0];
  },
  findByEmail: async (email) => {
    const user = await connect('users', 'findOne', { email });
    return user;
  },
};
