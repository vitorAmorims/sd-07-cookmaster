const err = require('../erro');
const model = require('../model/recipes');

const newRecipe = async (recipeName, ingredients, preparation, userId) => {
  if (!recipeName || !ingredients || !preparation) {
    return err('Invalid entries. Try again.', 400);
  }
  const resp = await model.createRecipe(
    recipeName,
    ingredients,
    preparation,
    userId,
  );
  if (resp) {
    return { recipe: { ...resp } };
  }
  return err('deu pau ai', 400);
};

const editRecipe = async (userInfo, recipeInfo) => {
  const a = await model.listRecipesById(recipeInfo.id);
  if (!a) return err('Id da receita invalido', 401);
  if (userInfo.role === 'admin' || userInfo.userId.toString() === a.userId.toString()) {
    await model.editRecipesById(
      recipeInfo.name,
      recipeInfo.ingredients,
      recipeInfo.preparation,
      recipeInfo.id,
    );
    return {
      name: recipeInfo.name,
      ingredients: recipeInfo.ingredients,
      preparation: recipeInfo.preparation,
      _id: recipeInfo.id,
      userId: userInfo.userId,
    };
  }
  return err('Nao eh o dono da receita nem o admin', 401);
};

const deleteRecipe = async (userInfo, id) => {
  const doesRecipeWithIdExists = await model.listRecipesById(id);
  if (!doesRecipeWithIdExists) return err('Id da receita invalido', 401);
  console.log(userInfo.role, userInfo.userId, doesRecipeWithIdExists.userId);
  if (
    userInfo.role === 'admin'
    || userInfo.userId.toString() === doesRecipeWithIdExists.userId.toString()
  ) {
    await model.deleteRecipesById(id);
    return {
      message: 'deu bom ',
    };
  }
  return err('Nao eh o dono da receita nem o admin', 401);
};

module.exports = { newRecipe, editRecipe, deleteRecipe };