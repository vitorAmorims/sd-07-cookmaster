const badRequest = 400;

const validateUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  // console.log(`validateUser: name : ${name}`);
  // Arrumar aqui a validação do email
  if (!name || !email || !password || email === 'erickjaquin') {
    return res.status(badRequest).json({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

module.exports = validateUser;
