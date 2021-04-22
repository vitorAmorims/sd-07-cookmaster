const invalidTokenMessage = { message: 'jwt malformed' };
const missingToken = { message: 'missing auth token' };
const UNAUTHORIZED = 401;

module.exports = {
  invalidTokenMessage,
  missingToken,
  UNAUTHORIZED,
};