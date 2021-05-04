const validateToken = require('../helpers/validateToken');

const verifyAuthorization = (req, res, next) => {
    const token = req.headers.authorization; 
 const payload = validateToken(token);

 if (!payload) return res.status(401).json({ message: 'jwt malformed' });

    next();
};

module.exports = verifyAuthorization;