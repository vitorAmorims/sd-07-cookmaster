const multer = require('multer');

const { createErrorMessage } = require('../utils/createMessage');
const { INVALID_ENTRIES } = require('../utils/errorMessage');

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, callback) => {
    const { id } = req.params;

    if (!id) {
      const errorMessage = createErrorMessage(400, INVALID_ENTRIES);
      callback(new Error(errorMessage));
      return;
    }
    callback(null, `${id}.jpeg`);
  },
});

const imageUpload = multer({ storage });

module.exports = { imageUpload };
