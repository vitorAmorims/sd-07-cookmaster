const recipeNullCampsValidation = (req, res, next) => {
    const { name, ingredients, preparation } = req.body;
    if (
        name === undefined 
        || ingredients === undefined 
        || preparation === undefined
    ) {
        return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }
    next();
};

module.exports = { recipeNullCampsValidation };
