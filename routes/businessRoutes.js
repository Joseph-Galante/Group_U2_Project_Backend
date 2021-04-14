const businessController = require('../controllers/businessController')
const express = require('express');
const businessRoutes = express.Router()

businessRoutes.post('/', businessController.create)
businessRoutes.put('/:id', businessController.update)
businessRoutes.delete('/:id', businessController.delete)
businessRoutes.get('/:id', businessController.find)
businessRoutes.get('/', businessController.findAll)
module.exports = businessRoutes;