const sendPhotos = (_request, response) => {
  try {
    return response.status(200).json({ message: 'imagens enviadas com sucesso' });
  } catch (error) {
    return response.status(500).json({
      message: 'Erro ao enviar as imagens',
      error: error.message,
    });
  }
};

module.exports = {
  sendPhotos,
};
