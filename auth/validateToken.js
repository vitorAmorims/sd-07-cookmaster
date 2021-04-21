const jwt = require('jsonwebtoken');

const validateToken = async(req, res, next) => {
  const { authorization } = req.headers;

};

module.exports = validateToken;