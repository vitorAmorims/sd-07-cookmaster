const rescue = require('express-rescue');
const { getLogin } = require('../services');
const { UNAUTHORIZED, SUCCESS } = require('../CODE_ERROR');

const login = rescue(async (req, res) => {
try {
    const { email, password } = req.body;
    const token = await getLogin(email, password);
    res.status(SUCCESS).json({ token });
} catch (error) {
    res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
}
});

module.exports = { login };
