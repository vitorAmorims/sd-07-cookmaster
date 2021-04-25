const connection = require('../database/dbConfig');

const USER_COLLECTION = 'users';

const getUserCredentials = async (userEmail, userPassword) => {
    const user = await connection()
        .then((dataBase) => dataBase.collection(USER_COLLECTION)
        .findOne({ email: userEmail, password: userPassword }));
    return user;
};

module.exports = {
    // create,
    getUserCredentials,
};
