const rescue = require('express-rescue');
const { validationResult } = require('express-validator');
const serviceForRecipe = require('../service/serviceForRecipe');
const decodeJwt = require('../helpers/decodeJwt');
const code = require('../helpers/status.json');

const create = rescue(async (req, res) => {
        const { name, ingredients, preparation } = req.body;
        const { token } = req.headers;
        const decoded = decodeJwt(token);
        const { _id } = decoded.payload.data;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(code.Bad_Request).json({ message: 'Invalid entries. Try again.' });
        }
      
        const recipe = await serviceForRecipe.create(name, ingredients, preparation);
        const id = recipe.insertedId;
        return res.status(200)
        .json({ recipe: { name, ingredients, preparation, userId: _id, _id: id } });
});

module.exports = {
    create,
};