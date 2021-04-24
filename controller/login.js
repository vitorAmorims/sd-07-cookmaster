const rescue = require('express-rescue');
const serviceForLogin = require('../service/serviceForLogin');
const jwtFunc = require('../helpers/jwt');

const userAccess = rescue(async (req, res) => {
    try {
        const { email, password } = req.body;
   
        if (!email || !password) {
            res.status(401).json({ message: 'All fields must be filled' });
        }

       const user = await serviceForLogin.create(email, password);
       
       if (user.code) {
           return res.status(user.code).json({ message: user.message });
       }
        const tokenResult = await jwtFunc(user);
        res.status(200).json({ token: tokenResult });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {
    userAccess,
};