const service = require('../../services/users');

const createUser = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const data = await service.create(name, email, password);
        res.status(201).json({
            user: data,
        });
    } catch (error) {
        res.status(500).send('We found an error');
    }
};

module.exports = {
    createUser,
};