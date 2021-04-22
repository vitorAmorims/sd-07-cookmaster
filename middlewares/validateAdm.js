module.exports = async (req, res, next) => {
    const { user } = req;
    if (user.role !== 'admin') {
        const err = new Error('Only admins can register new admins');
        err.statusCode = 403;
        return next(err);
    }
    return next();
};
