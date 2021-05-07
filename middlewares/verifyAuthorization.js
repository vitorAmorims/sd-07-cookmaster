const validateToken = require('../helpers/validateToken');
const message = require('../helpers/message.json');

const verifyAuthorization = (req, res, next) => {
    const token = req.headers.authorization; 
    if (!token) return res.status(401).json({ message: message.update });
//  
   const payload = validateToken(token);
   req.user = payload;
   if (!payload) return res.status(401).json({ message: message.tokenInvalido });
   
    next();
};

module.exports = verifyAuthorization;
