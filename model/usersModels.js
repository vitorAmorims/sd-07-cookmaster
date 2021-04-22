const { ObjectId } = require('mongodb');
const connect = require('../config/connection');

async function checkDBForEmail(email) {
    return connect().then(async (db) => {
        try {
            return await db.collection('users').findOne({ email });
        } catch (error) {
            return false;
        }
    });
}

async function addUserModel(name, email, password) {
    const newUser = await connect().then(async (db) => {
        try {
            return db.collection('users').insertOne({
                name, email, password,
            });
        } catch (error) {
            return false;
        }
    });
    return { name, email, _id: newUser.insertedId, role: 'user' };
}
async function getUserModel(email) {
    return connect().then(async (db) => {
        try {
            return db.collection('users').findOne({ email });
        } catch (error) {
            return false;
        }
    });
}
async function findUserByName(name) {
    return connect().then(async (db) => {
        try {
            return db.collection('users').findOne({ name });
        } catch (error) {
            return false;
        }
    });
}
async function addRecipeModel(name, ingredients, preparation, userId) {
    const result = await connect().then(async (db) => {
        try {
            return db.collection('recipes').insertOne({
                name, userId, ingredients, preparation,
            });
        } catch (error) {
            return false;
        }
    });
    return result.ops[0];
}
async function getAllRecipesModel() {
    return connect().then(async (db) => {
        try {
            return db.collection('recipes').find({}).toArray();
        } catch (error) {
            return false;
        }
    });
}
async function getRecipeByIdModel(id) {
    return connect().then(async (db) => {
        try {
            return db.collection('recipes').findOne({ _id: ObjectId(id) });
        } catch (error) {
            return false;
        }
    });
}

async function updateRecipeByIdModel(id, body) {
    const { name, ingredients, preparation } = body;
    return connect().then(async (db) => {
        try {
            return db.collection('recipes').updateOne({ _id: ObjectId(id) }, {
                $set: { name, ingredients, preparation },
            });
        } catch (error) {
            return false;
        }
    });
}
async function deleteRecipeByIdModel(id) {
    console.log('no model');
    return connect().then(async (db) => {
        try {
            return db.collection('recipes').deleteOne({ _id: ObjectId(id) });
        } catch (error) {
            return false;
        }
    });
}

module.exports = {
    checkDBForEmail,
    addUserModel,
    getUserModel,
    addRecipeModel,
    findUserByName,
    getAllRecipesModel,
    getRecipeByIdModel,
    updateRecipeByIdModel,
    deleteRecipeByIdModel,
};