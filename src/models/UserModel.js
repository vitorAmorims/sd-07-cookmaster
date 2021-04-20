const connection = require('./connection');

module.exports = {
  async create({ name, email, role, password }) {
    const db = await connection();
    const result = await db.collection('users').insertOne({ name, email, role, password });
    return result.ops[0];
  },
  async getByEmail(email) {
    const db = await connection();
    const result = await db.collection('users').findOne({ email });
    return result;
  }
}