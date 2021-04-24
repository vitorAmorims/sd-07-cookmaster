const modelForUser = require('../model/modelForUser');
const errorCreator = require('../helpers/errorCreator');
const code = require('../helpers/status.json');
const message = require('../helpers/message.json');

const getAll = async () => {
    const user = await modelForUser.getAll();
    return user;
};

const getUseEmail = async (userEmail) => {
    const user = await modelForUser.getUseEmail(userEmail);
    if (user === null) {
        return false;
    }
    return user;
};

const create = async (name, email, password) => {
    const getEmail = await getUseEmail(email);
    console.log(getEmail.email);
    if (getEmail.email !== email || !getEmail.email) {
        const user = await modelForUser.create(name, email, password);
        return user;
    }
    return errorCreator(code.conflict, message.same_email);
};

module.exports = {
    create,
    getAll,
    getUseEmail,
};