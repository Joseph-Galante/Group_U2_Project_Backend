// grab controller
const userController = require('../controllers/userController');

// express
const express = require('express');
const userRoutes = express.Router();

// routes
// user info
userRoutes.get('/', userController.getAll);
userRoutes.post('/', userController.create);
userRoutes.post('/login', userController.login);
userRoutes.get('/profile', userController.profile);
userRoutes.put('/profile', userController.update);
// user's businesses
userRoutes.post('/businesses', userController.listBusiness);
userRoutes.get('/businesses', userController.getListedBusinesses);
userRoutes.get('/businesses/:id', userController.getListedBusiness);
userRoutes.put('/businesses/:id', userController.editBusiness);
userRoutes.delete('/businesses/:id', userController.deleteListedBusiness);
// user's reviews
userRoutes.post('/businesses/:id/reviews', userController.postReview);
userRoutes.put('/reviews/:id', userController.editReview);
userRoutes.delete('/businesses/:businessId/reviews/:reviewId', userController.deleteReview);

module.exports = userRoutes;