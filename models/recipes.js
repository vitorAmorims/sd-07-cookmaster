const connection = require('./connection');

const getAll = async () => {
    const get = connection()
      .then((db) => db.collection('recipes')
        .find().toArray());
   return get;
};

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
    getAll,
    recipes,
    findByName,
};