const service = require('../../services/users');

const createUser = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const data = await service.create(name, email, password);
        return res.status(201).json({
            user: data,
        });
    } catch (error) {
        return res.status(500).send('We found an error');
    }
};

const logUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await service.log(email, password);
        if (!token) {
 return res.status(401).json({
            message: 'Incorrect username or password',
        }); 
}
        return res.status(200).json({
            token,
        });
    } catch (error) {
        res.status(500).send('We found an error');
    }
};

module.exports = {
    createUser,
    logUser,
};