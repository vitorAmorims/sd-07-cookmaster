const model = require('../../models/recipes');
// const bcrypt = require('bcrypt-nodejs');

const create = async (name, ingredients, preparation) => {
    const data = await model.create(name, ingredients, preparation);
    return data;
};

const getAll = async () => {
    const data = await model.getAll();
    return data;
};

const getById = async (id) => {
    const recipe = await model.getById(id);
    return recipe;
};

module.exports = {
    create,
    getAll,
    getById,
};