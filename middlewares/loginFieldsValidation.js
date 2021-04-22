module.exports = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        const err = new Error('All fields must be filled');
        err.statusCode = 401;
        return next(err);
    }
    return next();
};