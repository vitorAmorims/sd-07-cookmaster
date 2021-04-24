const { validationResult } = require('express-validator');
const rescue = require('express-rescue');
const serviceForUser = require('../service/serviceForUser');

const getAll = rescue(async (_req, res) => {
    try {
        const users = await serviceForUser.getAll();
    res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const create = async (req, res) => {
        const { name, email, password } = req.body;
        const role = 'user';
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Invalid entries. Try again.' });
        }
        const user = await serviceForUser.create(name, email, password);
        
        if (user.code) return res.status(user.code).json({ message: user.message });

        const id = user.insertedId;

        res.status(201).json({ user: { name, email, role, _id: id } });
};

module.exports = {
    create,
    getAll,
};