const codes = require('../services/codes');

const authAdmin = (req, res, next) => {
    const { user } = req;
    if (user.role !== 'admin') {
        return res.status(codes.forbidden).json({
            message: 'Only admins can register new admins',
        });
    }
    next();
};

module.exports = authAdmin;