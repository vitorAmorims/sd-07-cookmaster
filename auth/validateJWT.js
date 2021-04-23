const jwt = require('jsonwebtoken');
const service = require('../models/user');

const secret = 'meutoken';

 const validateJWT = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const { name } = await service.findByUser(decoded.data.name);
  
    if (!name) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }    
    req.body.userName = name;  
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;