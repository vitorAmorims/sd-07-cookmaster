const connection = require('../database/dbConfig');

const USER_COLLECTION = 'users';

// const create = async (email, password) => {
//     const user = await connection()
//         .then((dataBase) => dataBase.collection(USER_COLLECTION).insertOne({ email, password }));
//     return user;
// };

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
