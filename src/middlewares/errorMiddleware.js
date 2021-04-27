const conflictError = (err, res) => {
  const conflict = 409;
  let response;

  if (err.statusCode === 'conflict') {
    return res.status(conflict).json({ message: err.message });
  }
  return response;
};

const unauthorizedError = (err, res) => {
  const unauthorized = 401;
  let response;

  if (err.statusCode === 'unauthorized') {
    return res.status(unauthorized).json({ message: err.message });
  }
  return response;
};

const notFoundError = (err, res) => {
  const notFound = 404;
  let response;

  if (err.statusCode === 'not_found') {
    return res.status(notFound).json({ message: err.message });
  }
  return response;
};

const errorMiddleware = (err, req, res, _next) => {
  if (err.statusCode) {
    const badRequestCode = 400;

    if (err.statusCode === 'bad_request') {
      res.status(badRequestCode).json({ message: err.message });
    }
    
    conflictError(err, res);
    unauthorizedError(err, res);
    notFoundError(err, res);
  } else {
    console.log('ERRO', err);
    const erroMsg = 500;
    res.status(erroMsg).json(err.message);
  }
};

module.exports = errorMiddleware;
