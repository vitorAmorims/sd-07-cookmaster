const { diskStorage: DiskStorage } = require('multer');
const { resolve } = require('path');

module.exports = {
  storage: new DiskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      cb(null, `${req.params.id}.jpeg`);
    },
  }),
};
