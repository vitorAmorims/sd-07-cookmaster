const jwt = require('jsonwebtoken');
const model = require('../model/user');

const segredo = 'taSeguroConfia';

const checkAdmin = (requireAdmin, decoded) => {
  if (requireAdmin && decoded.data.role !== 'admin') {
    console.log('entrou');
    return {
      message: 'Only admins can register new admins',
    };
  }
  return 'ok';
};

module.exports = (requireAdmin) => async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'missing auth token' });
    try {
      const decoded = jwt.verify(token, segredo);
      console.log('decoded: ', decoded, (decoded.data.role !== 'admin'), requireAdmin);
      const isAdminValid = checkAdmin(requireAdmin, decoded);
      if (isAdminValid.message) {
        return res.status(403).json(isAdminValid);
      }
      const user = await model.getByEmail(decoded.data.email);
      if (!user) return res.status(401).json({ message: 'Erro ao procurar usuario do token.' }); 
      req.user = decoded.data;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
  };