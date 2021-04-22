const { ObjectId } = require('mongodb');
const connection = require('../../config/connection');

const getAllRecipes = async () => {
    const result = await connection()
        .then((db) => db.collection('recipes').find().toArray());

    return result;
};

const getById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const result = await connection()
        .then((db) => db.collection('recipes').findOne(new ObjectId(id)));

    return result;
};

const returnObject = (id, name, ingredients, preparation) => ({
    _id: id,
    name,
    ingredients,
    preparation,
});

const editRecipe = async (id, name, ingredients, preparation) => {
    if (!ObjectId.isValid(id)) return null;
    const resultCheck = await connection()
        .then((db) => db.collection('recipes').findOne(new ObjectId(id)));
    if (!resultCheck) return null;
    const result = await connection()
        .then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) },
            {
                $set: {
                    name,
                    ingredients,
                    preparation,
                },
            }));
    return { ...returnObject(id, name, ingredients, preparation), userId: result.userId };
};

const deleteRecipe = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const result = await connection()
        .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

    if (!result) return null;
    return result;
};

const registerRecipe = async (name, ingredients, preparation, userId) => {
    const result = await connection()
        .then((db) => db.collection('recipes')
            .insertOne({ name, ingredients, preparation, userId }));

    return {
        _id: result.insertedId,
        name,
        ingredients,
        preparation,

    };
};

const addImageRecipe = async (id, image) => {
    if (!ObjectId.isValid(id)) return null;
    const resultCheck = await connection()
        .then((db) => db.collection('recipes').findOne(new ObjectId(id)));
    if (!resultCheck) return null;

    await connection()
        .then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image: image } }))
    return { ...resultCheck, image };
}

module.exports = {
    registerRecipe,
    getAllRecipes,
    getById,
    editRecipe,
    deleteRecipe,
    addImageRecipe,
};