/** @format */

const { imageModel } = require('../models');

const imageService = async (id, filename) => {
  try {
    const URL = `localhost:300/images/${filename}`;
    const image = await imageModel(id, URL);
    return image;
  } catch (error) {
    throw new Error();
  }
};
module.exports = { imageService };
