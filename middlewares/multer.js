const multer = require('multer');

const { createErrorMessage } = require('../helpers/createMessage');
const { INVALID_ENTRIES } = require('../helpers/errorMessages');

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, callback) => {
    const { id } = req.params;

    if (!id) {
      const errorMessage = createErrorMessage(400, INVALID_ENTRIES);
      callback(new Error(errorMessage));
      return;
    }

    const startIndexExtension = file.originalname.search(/\./);
    const fileExtension = file.originalname.substr(startIndexExtension);

    callback(null, `${id}${fileExtension}`);
  },
});

const imageUpload = multer({ storage });

module.exports = { imageUpload };
