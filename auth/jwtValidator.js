const userController = require('../controller/controllerForUser');
const decodeJwt = require('../helpers/decodeJwt');

const message = 'jwt malformed';

const auth = async (req, res, next) => {
    const { token } = req.headers;
    try {
        if (!token) return res.status(401).json({ message: 'missing auth token' });
        const decoded = decodeJwt(token);
        
        if (!decoded) return res.status(401).json({ message });
        const userInserted = decoded.payload.data;
        const { _id: id } = userInserted;
        const user = await userController.userValidate(id);
        if (!user) { 
            return res.status(401).json({ message: 'jwt malformed' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = auth;

// o token do usuário está ligado ao id gerado pelo mongo, (id unico, token unico)
// se o usuario for deletado, outro token deve ser gerado
// ou o token anterior sera invalido.