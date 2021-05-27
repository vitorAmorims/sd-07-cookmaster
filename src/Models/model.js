const connection = require('../db/connection');

const connect = async (collection, command, params) => {
  try {
    const db = await connection();

    return await db.collection(collection)[command](params);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  connect,
};