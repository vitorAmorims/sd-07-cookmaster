const userController = require('../controller/controllerForUser');
const decodeJwt = require('../helpers/decodeJwt');

const message = 'jwt malformed';

const auth = async (req, res, next) => {
    const { token } = req.headers;
        
    try {
        if (!token) return res.status(401).json({ message });
        const decoded = decodeJwt(token);

        if (!decoded) return res.status(401).json({ message });
  
        const user = await userController.getUserByEmail(decoded.payload.data.email);
     
        if (user === null) { 
            return res.status(401).json({ message: 'jwt malformed' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = auth;
