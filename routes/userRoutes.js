// grab controller
const userController = require('../controllers/userController');

// express
const express = require('express');
const userRoutes = express.Router();

// routes
userRoutes.get('/', userController.getAll);
userRoutes.post('/', userController.create);
userRoutes.post('/login', userController.login);
userRoutes.get('/profile', userController.profile);
userRoutes.put('/profile', userController.update);
userRoutes.post('/recipes', userController.saveRecipe);
userRoutes.get('/recipes', userController.getSavedRecipes);
userRoutes.delete('/recipes', userController.deleteSavedRecipe);

module.exports = userRoutes;