const connect = require('../config/connection');

const addUser = async (name, email, password, role = 'user') => {
    const user = await connect().then((db) =>
        db.collection('users').insertOne({ name, email, password, role }));
    return user.ops[0];
};

const getAllUsers = async () => {
    const allUser = await connect()
        .then((db) => db.collection('users').find().toArray());
    return allUser;
};

const findUser = async (email) => {
    const user = await connect()
        .then((db) => db.collection('users').findOne({ email }));
    return user;
};

const addAdmin = async (name, email, password, role = 'adm') => {
    const adm = await connect().then((db) =>
        db.collection('users').insertOne({ name, email, password, role }));
    return adm.ops[0];
};

module.exports = {
    addUser,
    getAllUsers,
    findUser,
    addAdmin,
};
