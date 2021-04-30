const { imageService } = require('../services');
const { INTERNAL, SUCCESS } = require('../CODE_ERROR');

const UpImage = async (req, res) => {
try {
    const { id } = req.params;
    const { filename } = req.file;
    const image = await imageService(id, filename);
    res.status(SUCCESS).json(image);
} catch (error) {
    res.status(INTERNAL).json({ message: 'Erro ao no update' });
}
};

module.exports = { UpImage };
