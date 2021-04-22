const jwt = require('../../jwt');

const verifyAuth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'missing auth token' });
    const data = jwt.verify(token);
    if (!data) {
 return res.status(401).json({
        message: 'jwt malformed',
    }); 
}
    req.body.userId = data.userId;
    next();
};

module.exports = verifyAuth;