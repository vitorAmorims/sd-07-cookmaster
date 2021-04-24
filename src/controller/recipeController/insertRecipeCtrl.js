const { Router } = require('express');
// const { clientErr, serverErr, success } = require('../statusCodes');
const { serverErr } = require('../dictionaries');

const insertRecipeCtrl = Router();

insertRecipeCtrl.post('/', async (req, res, next) => {
  console.log(req)
  try {
    const { body } = req;
    console.log(body);
    // const insertionRes = await insRecipeServ(body);
    // console.log(insertionRes);
  } catch (error) {
    console.log(error);
    return next({ error, status: serverErr['Internal Server Error'] });
  }
});

module.exports = insertRecipeCtrl;
