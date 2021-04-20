const { recipe } = require('../../schemas');

const verifyData = (req, res, next) => {
    const data = req.body;
    const { error } = recipe.validate(data);
    if (error) {
 return res.status(400).json({
        message: 'Invalid entries. Try again.',
    }); 
}

    next();
};

module.exports = verifyData;