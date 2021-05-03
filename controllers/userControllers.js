 const { validationResult } = require('express-validator');
const userService = require('../service/usersService');
const message = require('../helpers/message.json');
// const middlewares = require('../middlewares');

const create = async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
       return res.status(400).json({ message: message.invalid_entries });
    }
    const result = await userService.create(name, email, password);

    if (!result) return res.status(409).json({ message: message.emailExists });

    res.status(201).json({ user: { name, email, password, role: 'user' } });
    return result;
};

// const findByName = async (req, res) => {
//     const { name } = req.body;
//     const errors = validationResult(req);
//     if (name) {
//         return res.status(409).json({ message: message.emailExists });
//      }

// }

module.exports = create;