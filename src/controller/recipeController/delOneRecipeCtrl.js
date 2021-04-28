const { Router } = require('express');
const { delRecipeServ } = require('../../service');
const { statusMsgMap } = require('../dictionaries');

const delOneRecipeCtrl = Router();

delOneRecipeCtrl.delete('/:id', async (req, res, next) => {
  try {
    const { body, params, headers } = req;
    const { authorization } = headers;
    const deletionRes = await delRecipeServ(body, params, authorization);
    if (deletionRes.err) return next(deletionRes);
    const { status } = deletionRes;
    return res.status(statusMsgMap[`${status}`].status)
    .json(statusMsgMap[`${status}`].message 
    ? { message: statusMsgMap[`${status}`].message }
   : deletionRes.deletionRes);
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

module.exports = delOneRecipeCtrl;