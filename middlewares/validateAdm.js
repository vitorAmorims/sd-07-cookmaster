module.exports = async (req, res, next) => {
    const { user } = req;
    if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Only admins can register new admins' });
    }
    return next();
};