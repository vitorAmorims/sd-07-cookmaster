const servicesUsers = require('../services/servicesUsers');

const OK = 200;
const CREATED = 201;
const BADREQUEST = 400;
const CONFLICT = 409;
const UNPROCESSABLEENTITY = 422;
const INTERNALSERVERERROR = 500;

const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userNew = await servicesUsers.createUser(name, email, password);
    // console.log('controller', userNew);
    if (!userNew) {
      return res.status(BADREQUEST).json(
        { message: 'User was not created' }
      );
    }
    return res.status(CREATED).json(userNew);
  } catch (err) {
    // console.log(err);
    if (err.code === 'invalid_data' || err.code === 'conflict') {
      return res.status(BADREQUEST).json({ err });
    }
    res.status(INTERNALSERVERERROR).json({ message: 'Internal Server Error' });
  }
};

const getAll = async (req, res) => {
  try {
    const allUsers = await servicesUsers.getAll();
    // const allUsers = await modelsUsers.getAll();

    res.status(OK).json(allUsers);
  } catch (err) {
    res.status(INTERNALSERVERERROR).json({ message: 'Internal server error' });
  }
};

// const getByName = async (req, res) => {
//   const { id } = req.params;
//   console.log('controllersgetById');
//   try {
//     const prodById = await servicesUsers.getById(id);
//     res.status(OK).json(prodById);
//   } catch (err) {
//     if (err.code === 'invalid_data') {
//       return res.status(UNPROCESSABLEENTITY).json({ err });
//     }
//     res.status(INTERNALSERVERERROR).json({ err });
//     // res.status(UNPROCESSABLEENTITY).json({ err });
//   }
// };

module.exports = {
  createNewUser,
  getAll,
  // getById,
  // updateById,
  // excludeById
  // getAllSongs,
  // getById,
};
