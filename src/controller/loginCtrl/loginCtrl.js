const { Router } = require('express');
const { serverErr, statusMsgMap } = require('../dictionaries');
const { loginServ } = require('../../service');

const loginCtrl = Router();

// statusMsgMap[`${status}`].message
//   ? console.log('line 15 statusMsgMap.message: ', statusMsgMap[`${status}`].message)
//   : console.log('res has no msg')

loginCtrl.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const loginRes = await loginServ(body);
    if (loginRes.err) {
      return next(loginRes);
    }
    const { status } = loginRes;
    return statusMsgMap[`${status}`].message
      ? res.status(statusMsgMap[`${status}`].status)
        .json({ message: statusMsgMap[`${status}`].message })
      : res.status(statusMsgMap[`${status}`].status)
        .json({ token: loginRes.token });
  } catch (error) {
    console.log(error);
    return next({ error, status: serverErr['Internal Server Error'] });
  }
});

module.exports = loginCtrl;
