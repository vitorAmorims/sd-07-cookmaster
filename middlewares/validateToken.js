const jwt = require('jsonwebtoken');
const loginModel = require('../models/userModel');

const secret = 'senhasupersecreta';
module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'missing auth token' });
      }

    try {
        const decoded = jwt.verify(token, secret);
        const user = await loginModel.findUser(decoded.email);
        if (!user) { 
            return res.status(401).json({ message: 'Erro ao procurar usuario do token.' }); 
}
        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
