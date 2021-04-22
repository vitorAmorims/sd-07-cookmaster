const jwt = require('jsonwebtoken');

const {
    checkDBForEmail,
    addUserModel,
    getUserModel,
    findUserByName,
    addRecipeModel,
    getAllRecipesModel,
    getRecipeByIdModel,
    updateRecipeByIdModel,
} = require('../model/usersModels');

const secret = 'cookmaster';
const sete = 7;

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
function throwUserNameError() {
    throw new Error(JSON.stringify({
        text: 'Incorrect username or password', code: 401,
    }));
}

async function userLoginService(email, password) {
    const user = await getUserModel(email);
    if (!user) {
        throwUserNameError();
    }
    if (user.password !== password) {
        throw new Error(JSON.stringify({ text: 'Invalid password', code: 401 }));
    }

    const jwtConfig = {
        expiresIn: 60 * 20,
        algorithm: 'HS256',
    };
    const { name, id, role } = user;
    const token = jwt.sign({ data: { name, id, role } }, secret, jwtConfig);
    return { token };
}

function checkEmailAndPassword(email, password) {
    if (!email || !password) {
        throw new Error(JSON.stringify({ text: 'All fields must be filled', code: 401 }));
    }
}

async function validateEmailAndPassword(email, password) {
    checkEmailAndPassword(email, password);
    const isValid = await validateEmail(email);
    if (!isValid) {
        throwUserNameError(); 
}
    if (password !== 'admin' && password.length < sete) {
        throwUserNameError(); 
}
}
async function addRecipeService(name, ingredients, preparation, token) {
    if (!name || !ingredients || !preparation) {
        throw new Error(JSON.stringify({
            text: 'Invalid entries. Try again.', code: 400,
        }));
    }
    const decoded = jwt.verify(token, secret);
    const user = await findUserByName(decoded.data.name);
    const { _id: userId } = user;
    const result = await addRecipeModel(name, ingredients, preparation, userId);
    if (result) {
        return { recipe: result };
    }
}

async function getAllRecipesService() {
    return getAllRecipesModel();
}

async function getRecipeByIdService(id) {
    const recipe = await getRecipeByIdModel(id);
    if (!recipe) {
        throw new Error('recipe not found');
    }
    return recipe;
}
async function updateRecipeByIdService(id, body, token) {
    const decoded = jwt.verify(token, secret);
    const { name: nome, role } = decoded.data;
    const user = await findUserByName(nome);
    const recipe = await getRecipeByIdModel(id);
    const { userId } = recipe;
    const { _id: ID } = user;
    const { name, ingredients, preparation } = body;
    if (JSON.stringify(userId) === JSON.stringify(ID) || role === 'admin') {
        const update = await updateRecipeByIdModel(id, body);
        if (update) {
            return { name, ingredients, preparation, _id: id, userId };
        }
    }
    return false;
}

module.exports = {
    addUsersService,
    validateEmail,
    userLoginService,
    validateEmailAndPassword,
    addRecipeService,
    getAllRecipesService,
    getRecipeByIdService,
    updateRecipeByIdService,
};