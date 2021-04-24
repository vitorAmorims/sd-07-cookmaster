const emailValidator = /^\S+@\S+\.\S+$/;

const user = 'user';

const PORT = 3000;
const SUCCESS = 200;
const CREATED = 201;
const BAD_REQEUST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const CONFLICTS = 409;

const textoAleatorio = 'Mais uma noite como todas as anteriores.';

const invalidEntries = 'Invalid entries. Try again.';
const emailAlreadyRegistered = 'Email already registered';
const allFieldsMustBeFilled = 'All fields must be filled';
const incorrectUsernameOrPassword = 'Incorrect username or password';
const JWTMalformed = 'jwt malformed';
const recipeNotFound = 'recipe not found';
const missingAuthToken = 'missing auth token';

module.exports = {
    emailValidator,
    user,
    PORT,
    SUCCESS,
    CREATED,
    BAD_REQEUST,
    NOT_FOUND,
    CONFLICTS,
    UNAUTHORIZED,
    invalidEntries,
    emailAlreadyRegistered,
    allFieldsMustBeFilled,
    incorrectUsernameOrPassword,
    textoAleatorio,
    JWTMalformed,
    recipeNotFound,
    missingAuthToken,
};
