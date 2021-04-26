const fileFilterMiddleware = (req, file, callback) => {
  const allowedMimes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/gif',
    'image/jpg'];

    if (!allowedMimes.includes(file.mimetype)) {
      req.fileExtensao = true;

      return callback(null, false);
    }

    return callback(null, true);
};

module.exports = fileFilterMiddleware;
