const jwt = require('jsonwebtoken');

const secret = 'minhaSenhaUltraSecreta';
const tokenValidation = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'missing auth token' });
    }
    try {
        jwt.verify(token, secret);
    } catch (error) {
        return res.status(401).json({ message: 'jwt malformed' });
    }
    next();
};

module.exports = {
    tokenValidation,
};
