let STATUS;

const errorMiddleware = (err, _req, res, _next) => {
  switch (err.message) {
    case '{"message":"Invalid entries. Try again."}':
      STATUS = 400;
      break;
    case '{"message":"Email already registered"}':
      STATUS = 409;
      break;
    case '{"message":"All fields must be filled"}':
      STATUS = 401;
      break;
    case '{"message":"Incorrect username or password"}':
      STATUS = 401;
      break;
    default:
      STATUS = 406;
  }
  
  res.status(STATUS).json(JSON.parse(err.message));
};

module.exports = errorMiddleware;
