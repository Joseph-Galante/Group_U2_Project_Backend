// setup
const businessController = require('../controllers/businessController')
const express = require('express');
const businessRoutes = express.Router()

// routes
businessRoutes.get('/:id', businessController.find)
businessRoutes.get('/', businessController.findAll)
businessRoutes.get('/:id/reviews', businessController.getAllReviews)

module.exports = businessRoutes;