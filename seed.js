const connection = require('./src/config/connection');

const creatingAdmin = async () => connection()
    .then((db) => db.collection('users')
    .insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }));

creatingAdmin();
