const validUpdateRecipes = (dataDb, user) => {
  // const { params: { id }, user } = req;
  let userId;
  if (user) {
    const { data: { _id } } = user;
    userId = _id;
  }
  if (dataDb.userId !== userId && user.data.role === 'admin') userId = dataDb.userId;
  return userId;
};

module.exports = validUpdateRecipes;
