const jwt = require('jsonwebtoken');
const { findUserByName } = require('../model/usersModels');

const secret = 'cookmaster';

const validateToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'missing auth token' });
    }
    try {
        const decoded = jwt.verify(token, secret);
        const user = await findUserByName(decoded.data.name);
        if (!user) {
            return res.status(401).json({ message: 'jwt malformed' });
        }
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
    next();
};

module.exports = validateToken;