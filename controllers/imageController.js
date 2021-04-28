const getImageByName = async (req, res, next) => {
  try {
    res.sendFile(req.url, { root: './' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getImageByName,
};
