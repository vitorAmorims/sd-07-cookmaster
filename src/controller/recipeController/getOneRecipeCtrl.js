const { Router } = require('express');

const { getOneRecipeServ } = require('../../service');
const { serverErr, statusMsgMap } = require('../dictionaries');

const getOneRecipeCtrl = Router();

getOneRecipeCtrl.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const getOneRecipeRes = await getOneRecipeServ(id);
    const { status } = getOneRecipeRes;
    return statusMsgMap[`${status}`].message
      ? res.status(statusMsgMap[`${status}`].status)
        .json({ message: statusMsgMap[`${status}`].message })
      : res.status(statusMsgMap[`${status}`].status).json(getOneRecipeRes.recipe);
  } catch (err) {
    console.log(err);
    next({ err, status: serverErr['Internal Server Error'] });
  }
});

module.exports = getOneRecipeCtrl;