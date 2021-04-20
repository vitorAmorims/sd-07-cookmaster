const { Recipes } = require('../database/index');

class CreateRecipeService {
  async execute({ name, ingredients, preparation, userId }) {
    this.count += 1;
    const recipesModel = new Recipes();

    const recipesCreated = await recipesModel.create({
      name,
      ingredients,
      preparation,
      userId,
    });
    return recipesCreated;
  }
}

module.exports = CreateRecipeService;