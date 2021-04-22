const code = require('../utils/code');
const msg = require('../utils/msg');

const getImages = async (req, res) => {
  try {
    const { filename } = req.params;
    return res.download(`uploads/${filename}`);
  } catch (err) {
    console.error(err);
    return res.status(code.SERVER).json(msg.defaultErr);
  }
};

module.exports = {
  getImages,
};
