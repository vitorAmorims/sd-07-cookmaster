const { imageService } = require('../services');
const { INTERNAL, SUCCESS } = require('../CODE_ERROR');

const upImageController = async (req, res) => {
    const { id } = req.params;
    const URL = `localhost:3000/images/${id}.jpeg`;
try {
    const image = await imageService(id, URL);
    res.status(SUCCESS).json(image);
} catch (error) {
    res.status(INTERNAL).json({ message: 'Erro ao fazer o update' });
}
};

module.exports = { upImageController };
