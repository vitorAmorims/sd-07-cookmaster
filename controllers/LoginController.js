const jwt = require('jsonwebtoken');
const { SUCCESS } = require('../utils/statusCode.json');

const MINUTES = 60;

const secret = 'OverheadthealbatrossHangsmotionlessupontheairAnddeepbeneaththerollingwaves';

  const jwtconfig = {
    expiresIn: 30 * MINUTES,
    algorithm: 'HS256',
  };

const login = async (req, res) => { 
  const { email, role } = req.user;
  const token = jwt.sign({ data: email, role }, secret, jwtconfig);
  return res.status(SUCCESS).json({ message: 'Login com sucesso', token });
};

module.exports = login;
