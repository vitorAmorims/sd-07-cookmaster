const errorMiddleware = require('./error');
const authentication = require('./authentication');
const fieldValidator = require('./fieldValidator');
const tokenMissing = require('./tokenMissing');
const getRole = require('./getRole');

module.exports = {
    errorMiddleware,
    authentication,
    fieldValidator,
    tokenMissing,
    getRole,
};