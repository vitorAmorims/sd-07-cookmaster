const { ObjectId } = require('bson');
const multer = require('multer');
// const path = require('path');
// const fs = require('fs').promises;
const modelForRecipe = require('../model/modelForRecipe');
const errorGenerator = require('../helpers/errorCreator');
const code = require('../helpers/status.json');
const message = require('../helpers/message.json');

// const pathFile = path.resolve(`${__dirname}/../images`);

const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, 'uploads');
    },

   filename: (req, file, callback) => 
    //    if (!file.originalname.endsWith('jpeg')) {
    //      return callback(null, false);
    //    }

        callback(null, `${req.params.id}.jpeg`)
   ,
});

// const fileExistis = async (fileName) => {
//     const data = await fs.readdir(pathFile);
//     const item = data.some((file) => file.includes(fileName));

//     return item;
// };

const upload = multer({ storage,
    async fileFilter(req, file, callback) {
    // const myFile = await fileExistis(file.originalname);

    //     if (!myFile) {
    //        return callback(null, false);
    //     } 
      
          callback(null, true);
  },
});

const getAll = async () => {
    const recipes = await modelForRecipe.getAll();
    return recipes;
};

const getById = async (id) => {
    if (!ObjectId.isValid(id)) {
        return errorGenerator(code.Not_Found, message.recipe_not_found);
    }

    const recipe = await modelForRecipe.getById(id);

    if (recipe === null || !recipe) {
       return errorGenerator(code.Not_Found, message.recipe_not_found);
    }
    return recipe;
};

const create = async (name, ingredients, preparation, id) => {
    const recipe = await modelForRecipe.create(name, ingredients, preparation, id);
    return recipe;
};

const insertImg = async (userId, localHost, imgPath) => {
    const img = await modelForRecipe.insertImg(userId, localHost, imgPath);
    return img;
};

const update = async (id, name, ingredients, preparation) => {
    const recipe = await modelForRecipe.update(id, name, ingredients, preparation);
    if (recipe === null || !recipe) {
        return errorGenerator(code.Not_Found, message.recipe_not_found);
    }
    return recipe;
};

const exclude = async (id) => {
    if (!ObjectId.isValid(id)) {
        return errorGenerator(code.Not_Found, message.recipe_not_found);
    }
    const recipe = await modelForRecipe.exclude(id);

    if (!recipe) {
        return errorGenerator(code.Not_Found, message.recipe_not_found);
    }
    return recipe;
};

const getUserById = async (id) => {
    const user = await modelForRecipe.getUserById(id);
    return user;
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    exclude,
    getUserById,
    insertImg,
    upload,
};