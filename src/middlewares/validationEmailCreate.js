const { findByEmail } = require('../service/userServices');

const validEmail = async (req, res, next) => {
  const { email } = req.body;

  // disponivel em: https://cursos.alura.com.br/forum/topico-como-validar-email-e-senha-em-javascript-80469
  const regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

  if (!email || email === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  if (regex.test(email) === false) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  if (await findByEmail(email)) {
    return res.status(409)
      .json({ message: 'Email already registered' });
  }

  next();
};

module.exports = validEmail;
