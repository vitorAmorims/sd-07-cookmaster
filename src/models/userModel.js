const conn = require('../../conn');

const create = async (name, email, password, role) => (
    conn().then(async (db) => {
        const newUser = await db.collection('users').insertOne({ name, email, password, role });
        return newUser.ops[0];
    })
);

const getUserByEmail = async (email) => (
    conn().then(async (db) => {
        const user = await db.collection('users').findOne({ email });
        return user;
    })
);

module.exports = {
    create,
    getUserByEmail,
};