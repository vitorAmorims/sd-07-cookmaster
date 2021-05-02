const isAdmin = async (req, res, next) => {
  const role = req.user?.role;
  return role === 'admin' ? next() : (
    res.status(403).send({ message: 'Only admins can register new admins' })
  );
};

module.exports = isAdmin;
