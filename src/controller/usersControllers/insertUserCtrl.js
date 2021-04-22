const { Router } = require('express');
const { serverErr, statusMsgMap } = require('../dictionaries');
const insertUserServ = require('../../service/userServ');

const insertUserCtrl = Router();

// statusMsgMap[`${status}`].message
//   ? console.log('line 15 statusMsgMap.message: ', statusMsgMap[`${status}`].message)
//   : console.log('res has no msg')

insertUserCtrl.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const insertionRes = await insertUserServ(body);
    if (insertionRes.err) {
      return next(insertionRes);
    }
    const { status } = insertionRes;
    return statusMsgMap[`${status}`].message
      ? res.status(statusMsgMap[`${status}`].status)
        .json({ message: statusMsgMap[`${status}`].message })
      : res.status(statusMsgMap[`${status}`].status).json({ user: insertionRes.user });
  } catch (error) {
    console.log(error);
    return next({ error, status: serverErr['Internal Server Error'] });
  }
});

module.exports = { insertUserCtrl };
