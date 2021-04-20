const {
    checkDBForEmail,
    addUserModel,
} = require('../model/usersModels');

function validateEmail(email) {
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return regex.test(String(email).toLowerCase());
}

async function addUsersService(name, email, password) {
    const validEmail = await validateEmail(email);
    if (!name || !validEmail || !password) {
        throw new Error(JSON.stringify({ text: 'Invalid entries. Try again.', code: 400 }));
    }
    const existingEmail = await checkDBForEmail(email);
    if (existingEmail) {
        throw new Error(JSON.stringify({ text: 'Email already registered', code: 409 }));
    }
    return addUserModel(name, email, password);
}

module.exports = {
    addUsersService,
};