const connection = require('../configurations/connection');

const { DB_COLECTION_RECIPES } = process.env;

const getImageByName = async (name) => {
  const db = await connection();
  try {
    return await db.collection(DB_COLECTION_RECIPES).findOne(name);
  } catch (error) {
    throw new Error();
  }
};

module.exports = { getImageByName };
