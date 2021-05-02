const { findByEmail } = require('../service/userServices');

const validEmail = async (req, res, next) => {
  const { email } = req.body;

  // disponivel em: https://cursos.alura.com.br/forum/topico-como-validar-email-e-senha-em-javascript-80469
  const regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  
  if (!email || email === '') {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  if (regex.test(email) === false) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  const emailValid = await findByEmail(email);
  // console.log(emailValid);
  if (emailValid === null) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  next();
};

module.exports = validEmail;
