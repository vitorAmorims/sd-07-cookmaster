const { Router } = require('express');
// const insertRecipeCtrl = require('./insertRecipeCtrl');
const { insertRecipeServ } = require('../../service');
const { serverErr, statusMsgMap } = require('../dictionaries');

const insertRecipeCtrl = Router();

insertRecipeCtrl.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const token = req.headers.authorization;
    const insertionRes = await insertRecipeServ(body, token);
    if (insertionRes.err) {
      return next(insertionRes);
    }
    const { status } = insertionRes;
    return statusMsgMap[`${status}`].message
      ? res.status(statusMsgMap[`${status}`].status)
        .json({ message: statusMsgMap[`${status}`].message })
      : res.status(statusMsgMap[`${status}`].status).json({ recipe: insertionRes.recipe });
  } catch (err) {
    console.log(err);
    next({ err, status: serverErr['Internal Server Error'] });
  }
});

module.exports = insertRecipeCtrl;
