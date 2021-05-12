const checkAdminPrivilege = async (err, request, _response, next) => {
  if (err.status !== 200) return next(err);
  const { role } = err;

  if (role !== 'admin') {
    return next({
      status: 403,
      message: 'Only admins can register new admins',
    });
  }

  next();
};

module.exports = checkAdminPrivilege;
