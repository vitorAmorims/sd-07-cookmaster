const rescue = require('express-rescue');
const { createUser, createAdmins } = require('../services');
const { CREATED, INTERNAL, ROLE_USER, ROLE_ADMIN } = require('../CODE_ERROR');

const createUsers = rescue(async (req, res) => {
try {
    const { name, email, password } = req.body;
    const user = await createUser(name, email, password, ROLE_USER);
    res.status(CREATED).json({ user });
} catch (error) {
    res.status(INTERNAL).json({ message: error.message });
}
});

const createAdmin = rescue(async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const admin = await createAdmins(name, email, password, ROLE_ADMIN);
        res.status(CREATED).json({ user: admin });
    } catch (error) {
        res.status(INTERNAL).json({ message: error.message });
    }
    });

module.exports = { createUsers, createAdmin };
