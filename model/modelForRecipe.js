const { ObjectId } = require('bson');
const connection = require('../database/dbConfig');

const RECIPE_COLLECTION = 'recipes';

const getAll = async () => {
    const recipes = await connection()
        .then((dataBase) => dataBase.collection(RECIPE_COLLECTION).find().toArray());
    return recipes;
};

const getById = async (id) => {
    const recipe = await connection().then((dataBase) => dataBase.collection(RECIPE_COLLECTION)
      .findOne({ _id: ObjectId(id) }));
    return recipe;
};

const getUserById = async (id) => {
    const user = await connection()
        .then((dataBase) => dataBase.collection('users').findOne({ _id: ObjectId(id) }));
    return user;
};

const create = async (name, ingredients, preparation, userId) => {
    const recipe = await connection()
        .then((dataBase) => dataBase.collection(RECIPE_COLLECTION)
        .insertOne({ name, ingredients, preparation, userId }));
    return recipe;
}; 

const insertImg = async (recipeId, localhost, imgPath) => {
    console.log(`${localhost}${imgPath}`);
    const img = await connection().then((dataBase) => dataBase.collection(RECIPE_COLLECTION)
        .updateOne(
            { _id: ObjectId(recipeId) },
            {  
              $set: { 
                image: `${localhost}${imgPath}`,
              },
            },
          ));
    return img;
};

const update = async (id, name, ingredients, preparation) => {
    const recipe = await connection().then((dataBase) => dataBase.collection(RECIPE_COLLECTION)
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));
    return recipe;
};

const exclude = async (id) => {
    const recipe = await connection().then((dataBase) => dataBase.collection(RECIPE_COLLECTION)
        .deleteOne({ _id: ObjectId(id) }));
return recipe;
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    exclude,
    getUserById,
    insertImg,
};