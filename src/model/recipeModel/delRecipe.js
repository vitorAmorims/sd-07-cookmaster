const { ObjectId } = require('mongodb');
const getConnection = require('../connection');

const delRecipe = async (id) => {
  try {
    const conn = await getConnection();
    const deletionRes = await conn.collection('recipes')
      .deleteOne({ _id: ObjectId(id) });
    return deletionRes;
  } catch (err) {
    console.log(err);
    return { status: 'recipe deletion fail' };
  }
};

module.exports = delRecipe;