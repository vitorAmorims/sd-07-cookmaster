const { Router } = require('express');
// const insertRecipeCtrl = require('./insertRecipeCtrl');
const { insertRecipeServ } = require('../../service');
const { serverErr, statusMsgMap } = require('../dictionaries');

const insertRecipeCtrl = Router();

insertRecipeCtrl.post('/', async (req, res, next) => {
  console.log(req)
  try {
    const { body } = req;
    const insertionRes = await insertRecipeServ(body);
    if (insertionRes.err) {
      return next(insertionRes);
    }
    const { status } = insertionRes;
    return statusMsgMap[`${status}`].message
      ? res.status(statusMsgMap[`${status}`].status)
        .json({ message: statusMsgMap[`${status}`].message })
      : res.status(statusMsgMap[`${status}`].status).json({ user: insertionRes.user });
  } catch (err) {
    console.log(err);
    next({ err, status: serverErr['Internal Server Error'] });
  }
});

module.exports = insertRecipeCtrl;
