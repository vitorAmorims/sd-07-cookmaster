const connection = require('./connection');

const findByName = async (name) => 
connection().then((db) => db.collection('recipes').findOne({ name }));

const recipes = async (name, ingredients, preparation) => {
    const recipe = await connection()
        .then((db) =>
            db.collection('recipes')
              .insertOne({ name, ingredients, preparation }));
        return recipe;
      };

module.exports = {
    recipes,
    findByName,
};