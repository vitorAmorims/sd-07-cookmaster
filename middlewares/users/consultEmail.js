const model = require('../../models/users');

const consultEmail = async (req, res, next) => {
    const { email } = req.body;
    const user = await model.getByEmail(email);
    if (user !== null && user !== false) {
 return res.status(409).json({
        message: 'Email already registered',
    }); 
} 

    next();
};

module.exports = consultEmail;