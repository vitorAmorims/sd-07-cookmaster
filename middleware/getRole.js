const service = require('../service/serviceForRecipe');
const decodeJwt = require('../helpers/decodeJwt');

const message = 'missing auth token';

const getRole = async (req, res, next) => {
    const { id } = req.params; // id da receita
    const { authorization } = req.headers;
    
    const decoded = decodeJwt(authorization);

    if (!decoded) return res.status(401).json({ message });

    const { _id: idToken, role } = decoded.payload.data;

    const { userId } = await service.getById(id); // id do usuario
    const { _id: idUser } = await service.getUserById(userId);
    
    if (!idToken.match(idUser) && role === 'admin') return next();
    
    if (!idToken.match(idUser)) return res.status(401).json({ message });

    next();
};

module.exports = getRole;