const userServeices = require('../service/userServices');

const CREATED = 201;
const FAIL = 400;

const createUser = async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const result = await userServeices.createProducts(name, quantity);
        res.status(CREATED).json(result);
      } catch (error) {
        res.status(FAIL).json({ err: { code: 'invalid_data', message: error.message } });
      }
};

module.exports = { createUser };