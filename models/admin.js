const connection = require('./conn');

const addAdminModel = async (name, email, password) => {
  const admin = { name, email, password, role: 'admin' };
  const db = await connection();
  const product = await db.collection('users').insertOne(admin);
  return product.ops[0];
};

module.exports = { addAdminModel };