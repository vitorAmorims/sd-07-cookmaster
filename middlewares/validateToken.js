const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

module.exports = async (req, res, next) => {
    try {
        const secret = 'abc';
        const auth = req.headers.authorization;
        if (!auth) {
            return res.status(401).json({ message: 'missing auth token' });
        }
        const decoded = jwt.verify(auth, secret);
        const user = await userModel.findUser(decoded.data);
        if (user) {
            req.user = user;
            next();
        }
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};
