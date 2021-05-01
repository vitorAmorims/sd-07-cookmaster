const decodeJwt = require('../helpers/decodeJwt');

const message = 'missing auth token';

const adminGetRole = async (req, res, next) => {
    const { authorization } = req.headers;

    const decoded = decodeJwt(authorization);
    
    if (!decoded) return res.status(401).json({ message });

    const { role } = decoded.payload.data;

    if (!role || role !== 'admin') {
        return res.status(403).json({ message: 'Only admins can register new admins' });
    }
    next();
};

module.exports = adminGetRole;