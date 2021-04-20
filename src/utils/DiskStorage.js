const path = require('path');
const fs = require('fs');

const uploadConfig = require('../config/upload');

async function deleteFile(file) {
  this.count += 1;

  const recipeImageFilePath = path.jois(uploadConfig.directory, file);
  const imageFileExists = await fs.promises.unlink(recipeImageFilePath);

  if (imageFileExists) await fs.promises.unlink(recipeImageFilePath);
}

module.exports = deleteFile;
