const connection = require('../../db');

const create = async (name, email, password, role) => {
    try {
        const db = await connection();
        const user = await db.collection('users').insertOne({ name, email, password, role });
        const { _id } = user.ops[0];
        return { name, email, role, _id };
    } catch (error) {
        return false;
    }
};

const getByEmail = async (email) => {
    try {
        const db = await connection();
        const user = await db.collection('users').findOne({ email });
        return user;
    } catch (error) {
        return false;
    }
};

const log = async (email, password) => {
    try {
        const user = await getByEmail(email);
        const { name } = user;
        const { _id } = user;
        if (password === user.password) {
            return { name, email, userId: _id };
        }
        return false;
    } catch (error) {
        return false;
    }
};

module.exports = {
    create,
    getByEmail,
    log,
};