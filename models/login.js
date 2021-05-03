const connection = require('./connection');

const login = async (email, password) => {
    const user = await connection()
        .then((db) =>
            db.collection('users')
              .findOne({ email, password }));
        return user;
      };

module.exports = { 
  login,
 };