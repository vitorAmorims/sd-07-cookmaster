const jwt = require('jsonwebtoken');
const { findByEmail } = require('../service/userServices');

const tokenAuthorization = async (req, res, next) => {
  const token = req.headers.authorization;
  const secret = 'senhaMuitoSecrataParaDecodificacao';

  if (!token) res.status(401).json({ message: 'missing auth token' });

  try {
    const userAuth = jwt.verify(token, secret);
    console.log(userAuth.data);
    const user = await findByEmail(userAuth.data.email);
    const { _id: id, role } = user;
    
    console.log(req);
    req.userId = id;
    req.role = role;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = tokenAuthorization;
