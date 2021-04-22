module.exports = async (req, res, next) => {
    const { name, ingredients, preparation } = req.body;
    if (name === undefined || ingredients === undefined || preparation === undefined) {
        const err = new Error('Invalid entries. Try again.');
        err.statusCode = 400;
        return next(err);
    }
    return next();
};
