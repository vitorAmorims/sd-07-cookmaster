const path = require('path');

const getImageById = async (req, res) => {
  const { id } = req.params;

  res.status(200).sendFile(path.join(__dirname, `../../uploads/${id}`));
};

module.exports = { getImageById };
