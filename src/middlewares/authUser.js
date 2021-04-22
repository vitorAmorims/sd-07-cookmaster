const users = require('../models/usersModel');
const recipes = require('../models/recipesModel');
const codes = require('../services/codes');

const authUser = async (req, res, next) => {
    const { id } = req.params;
    const { user } = req;
    const resultRecipe = await recipes.getById(id);
    if (!resultRecipe) {
 return res.status(codes.notFound).json({
        message: 'not_found',
    }); 
}
    const resultUsers = await users.findUser(user.username);
    if (resultRecipe.userId.toString() === resultUsers.id.toString()
        || user.role === 'admin') {
        return next();
    }
    return res.status(codes.unauthorized).json({
        message: 'not authorization',
    });
};

module.exports = authUser;