function validateEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    return re.test(String(email).toLowerCase());
}

module.exports = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password || !validateEmail(email)) {
        const err = new Error('Invalid entries. Try again.');
        err.statusCode = 400;
        return next(err);
    }
    return next();
};
