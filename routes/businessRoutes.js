const businessController = require('../controllers/businessController')
const express = require('express');
const businessRoutes = express.Router()

businessRoutes.get('/:id', businessController.find)
businessRoutes.get('/', businessController.findAll)
module.exports = businessRoutes;