const path = require('path');

const errorMessage = {
  message: 'Erro interno',
};
const getImageById = (req, res) => {
  try {
    const { id } = req.params;
    const imagesPath = path.join(__dirname, `../uploads/${id}`);

    res.status(200).sendFile(imagesPath);
  } catch (error) {
    res.status(500).json(errorMessage);
    console.log(error);
  }
};

module.exports = {
  getImageById,
};
