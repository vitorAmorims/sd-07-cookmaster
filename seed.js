const connection = require('./config/conn');

const create = async (name, email, password, role) => {
    await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }));
  console.log('adm cadastrado com sucesso!');
};

create('admin', 'root@email.com', 'admin', 'admin');

module.exports = {
  create,
};
