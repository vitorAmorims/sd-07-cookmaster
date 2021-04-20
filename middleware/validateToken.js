const jwt = require('jsonwebtoken');
const { findUserByName } = require('../model/usersModels');

const secret = 'cookmaster';

const validateToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'jwt malformed1' });
    }
    try {
        const decoded = jwt.verify(token, secret);
        const user = await findUserByName(decoded.data);
        // console.log(user)
        if (!user) {
            return res.status(401).json({ error: 'jwt malformed2' });
        }
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
    next();
};

module.exports = validateToken;