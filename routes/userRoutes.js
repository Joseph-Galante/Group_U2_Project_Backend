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
userRoutes.post('/businesses', userController.listBusiness);
userRoutes.get('/businesses', userController.getListedBusiness);
userRoutes.delete('/businesses', userController.deleteListedBusiness);
userRoutes.post('/reviews', userController.postReview);
userRoutes.delete('/reviews', userController.deleteReview);

module.exports = userRoutes;