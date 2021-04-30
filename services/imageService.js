/** @format */

const { imageModel } = require('../models');

const imageService = async (id, URL) => {
    const imageId = await imageModel(id, URL);
    return imageId;
};

module.exports = { imageService };
