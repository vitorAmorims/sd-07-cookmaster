const userController = require('../controller/controllerForUser');
const decodeJwt = require('../helpers/decodeJwt');

const message = 'missing auth token';

const updateAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization);
    try {
        if (!authorization) return res.status(401).json({ message: 'missing auth token' });
        const decoded = decodeJwt(authorization);
        if (!decoded) return res.status(401).json({ message });

        const userInserted = decoded.payload.data;
        const { email } = userInserted;
        const user = await userController.userValidate(email);
        if (!user) { 
            return res.status(401).json({ message: 'jwt malformed' });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'jwt malformed' });
    }
};

module.exports = updateAuth;