const token = require('../oauth/token');

const getToken = async (request, response) => {
  try {
    const { email } = request.body;
    
    const webToken = token({ email });
    
    return response.status(200).json({ token: webToken });
  } catch (error) {   
    return response.status(500).json({ message: 'Erro interno', error });
  }
};

module.exports = {
  getToken,
};