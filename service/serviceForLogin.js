const loginForModel = require('../model/modelForLogin');
const errorCreator = require('../helpers/errorCreator');
const message = require('../helpers/message.json');
const code = require('../helpers/status.json');

const getUserCredentials = async (email, password) => {
    const user = await loginForModel.getUserCredentials(email, password);
    if (user === null) {
        return false;
    }
    return user;
};

const create = async (email, password) => {
    const user = await getUserCredentials(email, password);
  
    if (user.email !== email || !user || user.password !== password) {
        return errorCreator(code.Unauthorized, message.invalid_email);
    }
  
    return user;
};

module.exports = {
    create,
};