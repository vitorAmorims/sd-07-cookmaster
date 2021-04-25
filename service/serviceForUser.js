const modelForUser = require('../model/modelForUser');
const errorCreator = require('../helpers/errorCreator');
const code = require('../helpers/status.json');
const message = require('../helpers/message.json');

const getAll = async () => {
    const user = await modelForUser.getAll();
    return user;
};

const getUserEmail = async (userEmail) => { // function only into this context
    const user = await modelForUser.getUseEmail(userEmail);
    if (user === null) {
        return false;
    }
    return user;
};

const userValidate = async (email) => {
    const user = modelForUser.userValidate(email);
    return user;
};

const create = async (name, email, password, role) => {
    const getEmail = await getUserEmail(email);
   
    if (getEmail.email !== email || !getEmail.email) {
        const user = await modelForUser.create(name, email, password, role);
        return user;
    }
    return errorCreator(code.conflict, message.same_email);
};

module.exports = {
    create,
    getAll,
    getUserEmail,
    userValidate,
};