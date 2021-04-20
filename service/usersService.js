const jwt = require('jsonwebtoken');

const {
    checkDBForEmail,
    addUserModel,
    getUserModel,
    findUserByName,
    addRecipeModel,
} = require('../model/usersModels');

const sete = 7;
// const bcrypt = require('bcrypt-node');
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
    // const salt =bcrypt.genSaltSync(5);
    // const newPassword = bcrypy.hashSync(password,salt);
    return addUserModel(name, email, password);
}

async function userLoginService(email, password) {
    const user = await getUserModel(email);
    if (!user) {
        throw new Error(JSON.stringify({ text: 'Incorrect username or password', code: 401 }));
    }
    if (user.password !== password) {
        throw new Error(JSON.stringify({ text: 'Invalid password', code: 401 }));
    }
    const secret = 'cookmaster';
    const jwtConfig = {
        expiresIn: 60 * 20,
        algorithm: 'HS256',
    };
    const token = jwt.sign({ data: user.name }, secret, jwtConfig);
    return { token };
}
async function validateEmailAndPassword(email, password) {
    if (!email || !password) {
        throw new Error(JSON.stringify({ text: 'All fields must be filled', code: 401 }));
    }
    const isValid = await validateEmail(email);
    if (!isValid || password.length < sete) {
        throw new Error(JSON.stringify({ text: 'Incorrect username or password', code: 401 }));
    }
}
async function addRecipeService(name, ingredients, preparation, token) {
    if (!name || !ingredients || !preparation) {
        throw new Error(JSON.stringify({ text: 'Invalid entries. Try again.', code: 400 }));
    }
    const secret = 'cookmaster';
    const decoded = jwt.verify(token, secret);
    const user = await findUserByName(decoded.data);
    const result = await addRecipeModel(name, ingredients, preparation);
    const { _id: id } = user;
    if (result) {
        return { recipe: { ...result, userId: id } };
    }
}

module.exports = {
    addUsersService,
    validateEmail,
    userLoginService,
    validateEmailAndPassword,
    addRecipeService,
};