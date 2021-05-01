const errorMiddleware = require('./error');
const authentication = require('./authentication');
const fieldValidator = require('./fieldValidator');
const tokenMissing = require('./tokenMissing');
const adminGetRole = require('./adminGetRole');
const getRole = require('./getRole');

module.exports = {
    errorMiddleware,
    authentication,
    fieldValidator,
    tokenMissing,
    adminGetRole,
    getRole,
};