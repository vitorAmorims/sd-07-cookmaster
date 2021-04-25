const jwt = require('jsonwebtoken');

const secret = 'mysecretjtw';

const tokenValidationMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'token not found' });
  try {
    const decoded = jwt.verify(token, secret);
    console.log('token decodificado', decoded.data);
    // const user = await userService.findUser(decoded.data);
    // if (!user) return res.status(401).json({ message: "Erro ao procurar usuario do token." });

    req.user = decoded.data;

    next();
} catch (error) {
    res.status(401).json({ message: error.message });
}
};

module.exports = tokenValidationMiddleware;