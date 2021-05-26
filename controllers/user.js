const { addUser } = require('../models/userModel');

const newUser = async (req, res) => {
    try {
      console.log(req.body);
      const { name, email, password } = req.body;
      const user = await addUser(email, password, name);
      return res.status(201).json({ user });
    } catch (error) {
      return res.status(501).json(error.message);
    }
  };

module.exports = newUser;