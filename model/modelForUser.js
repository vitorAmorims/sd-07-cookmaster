const connection = require('../database/dbConfig');

const USER_COLLECTION = 'users';

const getAll = async () => {
    const user = await connection()
      .then((dataBase) => dataBase.collection(USER_COLLECTION).find().toArray());
return user;
};

const create = async (name, email, password) => {
    const user = await connection()
     .then((dataBase) => dataBase.collection(USER_COLLECTION)
     .insertOne({ name, email, password }));
return user;
};

const getUseEmail = async (userEmail) => {
    const user = await connection()
        .then((dataBase) => dataBase.collection(USER_COLLECTION)
        .findOne({ email: userEmail }));
    return user;
};

module.exports = {
    getAll,
    create,
    getUseEmail,
};