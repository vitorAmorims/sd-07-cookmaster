const multer = require('multer');
const path = require('path');
const express = require('express');

const router = express.Router();
const imagesPath = path.join(__dirname, 'uploads/');
router.use(express.static(imagesPath));

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
      callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
      const { id } = req.params;
      const nameFile = `${id}.jpeg`;
      callback(null, nameFile);
  },
});

const upload = multer({ storage });

module.exports = upload;
