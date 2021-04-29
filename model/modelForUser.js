const connection = require('../database/dbConfig');

const USER_COLLECTION = 'users';

const getAll = async () => {
    const user = await connection()
      .then((dataBase) => dataBase.collection(USER_COLLECTION).find().toArray());
return user;
};

const create = async (name, email, password, role) => {
    const user = await connection()
     .then((dataBase) => dataBase.collection(USER_COLLECTION)
     .insertOne({ name, email, password, role }));
return user;
};

const getUserEmail = async (userEmail) => {
    const user = await connection()
        .then((dataBase) => dataBase.collection(USER_COLLECTION)
        .findOne({ email: userEmail }));
    return user;
};

const userValidate = async (email) => {
    const user = await connection()
    .then((dataBase) => dataBase.collection(USER_COLLECTION)
    .findOne({ email }));
    return user;
};

module.exports = {
    getAll,
    create,
    getUserEmail,
    userValidate,
};