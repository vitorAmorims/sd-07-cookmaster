const servicesRecipes = require ('../services/servicesUsers');

const OK = 200;
const CREATED = 201;
const BADREQUEST = 400;
const CONFLICT = 409;
const UNPROCESSABLEENTITY = 422;
const INTERNALSERVERERROR = 500;

const createNewRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
    // need take userid(header!?)
    
    const recipeNew = await servicesRecipes.createRecipe(
      name,
      ingredients,
      preparation,
      // userId
    );
    if (!recipeNew) {
      return res.status(BADREQUEST).json({ message: 'Recipe was not created' });
    }
    return res.status(CREATED).json(recipeNew);
};

const getAll = async (req, res) => {
  try {
    const allRecipes = await servicesRecipes.getAll();
    // const allRecipes = await modelsRecipes.getAll();

    res.status(OK).json(allRecipes);
  } catch (err) {
    res.status(INTERNALSERVERERROR).json({ message: 'Internal server error' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipeById = await servicesRecipes.getById(id);
    res.status(OK).json(recipeById);
  } catch (err) {
    if (err.code === 'recipe not found') {
      return res.status(UNPROCESSABLEENTITY).json({ err });
    }
    res.status(INTERNALSERVERERROR).json({ err });
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  // need take userid(where!?)
  try {
    const updatedRecipe = await servicesRecipes.updateById(
      id,
      name,
      ingredients,
      preparation,
      // userId
    );
    res.status(OK).json(updatedRecipe);
  } catch (err) {
    if (err.code === 'Recipe was not updated') {
      return res.status(CONFLICT).json({ err });
    }
    res.status(INTERNALSERVERERROR).json({ message: 'Internal server error' });
  }
};

const excludeById = async (req, res) => {
  const { id } = req.params;
  try {
    const excludedRecipe = await servicesRecipes.excludeById(id);
    return res.status(OK).json(excludedRecipe);
  } catch (err) {
    if (err.code === 'Recipe was not deleted') {
      return res.status(CONFLICT).json({ err });
    }
    res.status(INTERNALSERVERERROR).json({ message: 'Internal server error' });
  }
};

// const updateImg = async (req, res) => {
//  *MULTER*--------
//   const { id } = req.params;
//   try {
//     const updateImg = await servicesRecipes.updateImg(id);
//     return res.status(OK).json(updateImg);
//   } catch (err) {
//     if (err.code === 'Recipe was not deleted') {
//       return res.status(CONFLICT).json({ err });
//     }
//     res.status(INTERNALSERVERERROR).json({ message: 'Internal server error' });
//   }
// };

module.exports = {
  createNewRecipe,
  getAll,
  getById,
  updateById,
  excludeById
  // getAllSongs,
  // updateImg
};
