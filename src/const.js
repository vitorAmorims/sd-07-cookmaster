const emailValidator = /^\S+@\S+\.\S+$/;

const user = 'user';

const PORT = 3000;
const CREATED = 201;
const BAD_REQEUST = 400;
const CONFLICTS = 409;

const invalidEntries = 'Invalid entries. Try again.';
const emailAlreadyRegistered = 'Email already registered';

module.exports = {
    emailValidator,
    user,
    PORT,
    CREATED,
    BAD_REQEUST,
    CONFLICTS,
    invalidEntries,
    emailAlreadyRegistered,
};
