const connection = require('../../config/connection');

module.exports = {
  connect(collection, command, params, optional) {
    let result;
    if (optional) {
      result = connection()
        .then((db) => db.collection(collection)[command](params, optional));
    } else {
      result = connection()
        .then((db) => db.collection(collection)[command](params));
    }
    return result;
  },
};
