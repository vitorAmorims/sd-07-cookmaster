const { StatusCodes } = require('http-status-codes');

const recipeId = (req, res) => {
  try {
    const { id } = req.params;
    return res.status(StatusCodes.OK).json(id);
  } catch (error) {
   return res.status(500).json({ 
     message: 'Erro ao enviar imagem',
    error: error.message,
   });
  }
};

module.exports = recipeId;
