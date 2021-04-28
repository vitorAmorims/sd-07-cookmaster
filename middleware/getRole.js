const service = require('../service/serviceForRecipe');
const decodeJwt = require('../helpers/decodeJwt');

const message = 'missing auth token';

const getRole = async (req, res, next) => {
    const { id: recipeId } = req.params; // id da receita
    const { authorization } = req.headers;

    const decoded = decodeJwt(authorization);

    if (!decoded) return res.status(401).json({ message });

    const { _id: idToken, role } = decoded.payload.data;

    const { userId } = await service.getById(recipeId); // UserId do usuario que criou a receita
    // const { _id: idUser } = await service.getUserById(userId); // busca na tabela de users o usuario
    
    if (!idToken.match(userId) && role === 'admin') return next();
    
    if (!idToken.match(userId)) return res.status(401).json({ message });

    next();
};

module.exports = getRole;