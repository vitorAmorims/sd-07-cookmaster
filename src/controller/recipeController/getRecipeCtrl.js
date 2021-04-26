const { Router } = require('express');
const { getRecipeServ } = require('../../service');
const { serverErr, statusMsgMap } = require('../dictionaries');

const getRecipeCtrl = Router();

getRecipeCtrl.get('/', async (_req, res, next) => {
  try {
    const getRecipesRes = await getRecipeServ();
    const { status } = getRecipesRes;
    return statusMsgMap[`${status}`].message
      ? res.status(statusMsgMap[`${status}`].status)
        .json({ message: statusMsgMap[`${status}`].message })
      : res.status(statusMsgMap[`${status}`].status).json(getRecipesRes.recipes);
  } catch (err) {
    console.log(err);
    next({ err, status: serverErr['Internal Server Error'] });
  }
});

module.exports = getRecipeCtrl;