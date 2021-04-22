const Recipe = require('../models/recipeModel');
const code = require('../utils/code');
const msg = require('../utils/msg');

const upload = async (req, res) => {
  try {
    const { id } = req.params;
    const url = `localhost:3000/images/${req.file.filename}`;
    const recipe = await Recipe.getById(id);
    return res.status(code.OK).json({ ...recipe, image: url });
  } catch (err) {
    console.error(err);
    return res.status(code.SERVER).json(msg.defaultErr);
  }
};

module.exports = {
  upload,
};
