const { INTERNAL_SERVER_ERROR } = require('./statusCodes');

const getImage = async (req, res) => {
  try {
    res.sendFile(req.url, { root: './' });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json(error.message);
  }
};

module.exports = {
  getImage,
};