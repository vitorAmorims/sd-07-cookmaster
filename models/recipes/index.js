const { ObjectId } = require('mongodb');
const connection = require('../../db');

const create = async (name, ingredients, preparation) => {
    try {
        const db = await connection();
        const user = await db.collection('recipes').insertOne({ name, ingredients, preparation });
        const { _id } = user.ops[0];
        return { name, ingredients, preparation, _id };
    } catch (error) {
        return false;
    }
};

const getAll = async () => {
    const db = await connection();
    const data = db.collection('recipes').find({});
    return data.toArray();
};

const getById = async (id) => {
    try {
        if (!ObjectId(id)) return false;
        const db = await connection();
    const recipe = db.collection('recipes').findOne(ObjectId(id));
    return recipe;
    } catch (error) {
        return false;
    }
};

module.exports = {
    create,
    getAll,
    getById,
};