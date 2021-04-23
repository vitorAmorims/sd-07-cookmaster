const conn = require('../../conn');

const login = async (email, password) => (
        conn().then(async (db) => {
            const user = await db.collection('users').findOne({ $and: [{ email }, { password }] });
            return user;
        })
    );

module.exports = {
    login,
};