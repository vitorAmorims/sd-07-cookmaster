/** @format */

const { imageModel } = require('../models');

const imageService = async (id, filename) => {
  try {
    const URL = `localhost:3000/images/${filename}`;
    const imageId = await imageModel(id, URL);
    return imageId;
  } catch (error) {
    throw new Error();
  }
};
module.exports = { imageService };
