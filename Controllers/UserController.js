const {
  verifyUser,
} = require('../Services/UserService');

const addUser = async (req, res) => {
  const resOK = 201;
  try {
    const { name, email, password } = req.body;
    const newUser = await verifyUser(name, email, password);
    return res.status(resOK).json({user:newUser});
  } catch(err) {
    console.log(err);
		return res.status(err.code).json({ message: err.message} );
  }
}

module.exports = {
  addUser,
}