const MISSING_DATA = 400;
const CONFLICT_DATA = 409;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;

const errorMiddleware = (err, _req, res, _next) => {
    if (err.code === 'bad_request') {
      res.status(MISSING_DATA).json({ message: err.message });    
    }
    if (err.code === 'conflict') {
      res.status(CONFLICT_DATA).json({ message: err.message });    
    }
    if (err.code === 'unauthorized') {
      res.status(UNAUTHORIZED).json({ message: err.message });    
    }
    if (err.code === 'not_found') {
      res.status(NOT_FOUND).json({ message: err.message });    
    }
};
  
  module.exports = { errorMiddleware };