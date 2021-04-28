const { Router } = require('express');
const { editRecipeServ } = require('../../service');
const { statusMsgMap } = require('../dictionaries');

const editRecipeCtrl = Router();

editRecipeCtrl.put('/:id', async (req, res, next) => {
  try {
    const { body, params, headers } = req;
    const { authorization } = headers;
  const editionRes = await editRecipeServ(body, params, authorization);
  if (editionRes.err) return next(editionRes);
  const { status } = editionRes;
  return res.status(statusMsgMap[`${status}`].status)
        .json(statusMsgMap[`${status}`].message 
         ? { message: statusMsgMap[`${status}`].message }
        : editionRes.editionRes);
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

module.exports = editRecipeCtrl;