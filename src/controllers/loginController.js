const loginService = require('../services/loginService');
const constants = require('../const');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const loginResult = await loginService.login(email, password);

        if (loginResult.error) {            
            return res.status(loginResult.error.status).json({
                message: loginResult.error.message,
            });           
        }

        return res.status(constants.SUCCESS).json({ token: loginResult });
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    login,
};