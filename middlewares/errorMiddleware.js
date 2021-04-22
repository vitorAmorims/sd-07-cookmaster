let BAD_REQUEST = 400;

const errorMiddleware = (err, _req, res, _next) => {
  if (err.message === '{"message":"Email already registered"}') {
  BAD_REQUEST = 409;
  } 
  
  res.status(BAD_REQUEST).json(JSON.parse(err.message));
  // res.status(BAD_REQUEST).json(err.message);
};

module.exports = {
  errorMiddleware,
};
