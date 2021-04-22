function validateEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    return re.test(String(email).toLowerCase());
}

module.exports = async (req, res, next) => {
    const { email } = req.body;
    if (!validateEmail(email)) {
        const err = new Error('Incorret username or password');
        err.statusCode = 401;
        return next(err);
    }
    return next();
};
