const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
    const get = connection()
      .then((db) => db.collection('recipes')
        .find().toArray());
   return get;
};

const findByid = async (id) => {
  const byId = await connection()
    .then((db) => db.collection('recipes')
      .findOne(ObjectId(id)));
      return byId;
};

const updateRecipes = async (id, name, ingredients, preparation) => {
  const update = await connection()
  .then((db) =>
    db.collection('recipes')
      .updateOne(
        { _id: ObjectId(id) }, { $set: { name, ingredients, preparation } },
));
return update;
// const recipe = await findByid(id);
//             if (update) return recipe;
//             return false;
};

const findByName = async (name) => 
connection().then((db) => db.collection('recipes').findOne({ name }));

const recipes = async (name, ingredients, preparation, id) => {
    const recipe = await connection()
        .then((db) =>
            db.collection('recipes')
              .insertOne({ name, ingredients, preparation, userId: ObjectId(id) }));
        console.log(recipe.ops[0]);
        return recipe.ops[0];
      };

const deleteRecipes = async (id) => {
  const deleteRecipe = await connection()
          .then((db) => db.collection('recipes')
            .deleteOne({ _id: ObjectId(id) }));
            return deleteRecipe;
      };

const editUpload = async (id, filename) => {
  const upload = await connection()
  .then((db) =>
    db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { image: filename } }));
      return upload;
  };

module.exports = {
    getAll,
    findByid,
    updateRecipes,
    recipes,
    findByName,
    deleteRecipes,
    editUpload,
};