const sendPhotos = (_request, response) => {
  try {
    response.status(200).json({ message: 'imagens enviadas com sucesso' });
  } catch (error) {
    response.status(500).json({
      message: 'Erro ao enviar as imagens',
      error: error.message,
    });
  }
};

module.exports = {
  sendPhotos,
};
