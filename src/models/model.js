const connection = require('../../config/connection');

module.exports = {
  async connect(collection, command, params, optional) {
    const db = await connection();
    let result;
    if (optional) {
      result = await db.collection(collection)[command](params, optional);
    } else {
      result = await db.collection(collection)[command](params);
    }
    return result;
  },
};
