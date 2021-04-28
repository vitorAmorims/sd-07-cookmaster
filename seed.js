// colocar query do MongoDB
const connect = require('./config/conn');

connect().then((db) =>
db.collection('users')
.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }));
/*
"db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });"
*/