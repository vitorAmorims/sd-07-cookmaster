const { Recipes } = require('../database/index');

class ListRecipesService {
  async execute() {
    this.count += 1;
    const recipesModel = new Recipes();

    const recipeCreated = await recipesModel.findAll();

    return recipeCreated;
  }
}

module.exports = ListRecipesService;
