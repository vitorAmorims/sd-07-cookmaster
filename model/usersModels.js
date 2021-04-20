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

module.exports = {
    checkDBForEmail,
    addUserModel,
    getUserModel,
};