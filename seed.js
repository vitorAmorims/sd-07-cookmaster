// colocar query do MongoDB
const connect = require('./config/conn');
const registerUser = async (name, email, password) =>
  connect().then((db) =>
    db.collection('users').insertOne({ name, email, password })
  ).then(result => result.ops[0].username );


module.exports = {
  registerUser,
}