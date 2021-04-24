const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const userService = require('../service/userService');
const userModel = require('../model/userModel');

const router = express.Router();

const secret = 'seusecretdetoken';

const missingToken = 'missing auth token';

const storage = multer.diskStorage({
  destination: (req, file, callback) => { callback(null, 'uploads'); },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.${file.mimetype.split('/')[1]}`);
  },
});

const upload = multer({ storage });

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: missingToken });
  next();
};

router.put('/recipes/:id/image/', tokenValidation, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const recipes = await userModel.getRecipesById(id);
  const { _id: Id } = recipes;
  recipes.image = `localhost:3000/images/${Id}.jpeg`;
  return res.status(200).json(recipes);
});

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

router.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  let { role } = req.body;
  if (!role) role = 'user';
  const prmIsValid = userService.validatorUser(name, email, password);
  if (!prmIsValid) return res.status(400).json({ message: 'Invalid entries. Try again.' });
  const response = await userModel.getEmail(email);
  if (response.length > 0) return res.status(409).json({ message: 'Email already registered' });
  await userModel.createUser(name, email, password, role);
  return res.status(201).json({
    user: {
      name,
      email,
      role,
    },
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const prmIsValid = userService.validatorLogin(email, password);
  if (!prmIsValid) return res.status(401).json({ message: 'All fields must be filled' });
  const response = await userModel.getEmail(email);
  if (response.length === 0) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  const emailAndPassword = userService.emailAndPassword(email, password);
  if (!emailAndPassword) { 
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  const token = jwt.sign({ data: { email } }, secret, jwtConfig);
  return res.status(200).json({ token });
});

router.post('/recipes', async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const prmIsValid = userService.validatorRecipes(name, ingredients, preparation);
  if (!prmIsValid) return res.status(400).json({ message: 'Invalid entries. Try again.' });
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, secret);
    const { email } = decoded.data;
    const [id] = await userModel.getId(email);
    const { _id: userId } = id;
    const recipe = { name, ingredients, preparation, userId };
    const response = await userModel.createRecipe(recipe);
    return res.status(201).json({ recipe: response.ops[0] });
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
});

router.delete('/recipes/:idRecipes', async (req, res) => {
  const { idRecipes } = req.params;
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: missingToken });
  const decoded = jwt.verify(token, secret);
  const { email } = decoded.data;
  const [id] = await userModel.getId(email);
  const { _id: userId } = id;
  if (userId) {
    await userModel.delRecipesById(idRecipes);
    return res.status(204).json();
  }
});

router.put('/recipes/:idRecipes', async (req, res) => {
  const { idRecipes } = req.params;
  const { name, ingredients, preparation } = req.body;
  if (!req.headers.authorization) return res.status(401).json({ message: 'missing auth token' });
  try {
    const decoded = jwt.verify(req.headers.authorization, secret);
    const { email } = decoded.data;
    const [id] = await userModel.getId(email); 
    const { _id: userId } = id;
    res.status(200).json({
      _id: idRecipes,
      name,
      ingredients,
      preparation,
      userId,
    });
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
});

router.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const recipes = await userModel.getRecipesById(id);
  if (recipes === null) return res.status(404).json({ message: 'recipe not found' });
  return res.status(200).json(recipes);
});

router.get('/recipes', async (req, res) => {
  const recipes = await userModel.getAllRecipes();
  return res.status(200).json(recipes);
});

// router.get('/teste', async (req, res) => {
//   const { email } = req.body;
//   const allUsers = await userModel.getAllUser();
//   const allRecipes = await userModel.getAllRecipes();
//   res.status(200).json(allRecipes);
// });

module.exports = router;
