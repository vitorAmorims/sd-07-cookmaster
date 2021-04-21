const connection = require('../../config/connection');

const createUser = async (email, password, name, role) => {
    const checkCollectionExit = await connection()
        .then((db) => db.collection('users').findOne({ email }));

    if (checkCollectionExit) return null;
    const result = await connection()
        .then((db) => db.collection('users').insertOne({ name, email, password, role }));

    return {
        _id: result.insertedId,
        name,
        email,
        password,
        role,
    };
};

const loginUser = async (email, password) => {
    const result = await connection()
        .then((db) => db.collection('users').findOne({ email }));
    if (!result || result.password !== password) return null;

    return result;
};

const findUser = async (email) => {
    const result = await connection()
        .then((db) => db.collection('users').findOne({ email }));
    const { _id } = result;
    return {
        id: _id,
        name: result.name,
        email: result.email,
        role: result.role,
    };
};

module.exports = {
    createUser,
    loginUser,
    findUser,
};