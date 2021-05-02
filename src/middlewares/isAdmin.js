const isAdmin = async (req, res, next) => {
  const { user: { role } } = req;
  return role === 'admin' ? next() : (
    res.status(403).send({ message: 'Only admins can register new admins' })
  );
};

module.exports = isAdmin;
