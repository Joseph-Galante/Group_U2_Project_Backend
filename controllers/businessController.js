const models = require('../models')

const businessController = {}

businessController.create = async (req, res) => {
    try {
        let newBusiness = await models.business.create({
            name: req.body.name,
            address: req.body.address,
            type: req.body.type,
            description: req.body.description,
            image: req.body.image
        })
        res.json({newBusiness})
    } catch (error) {
        res.json({error})
    }
}

businessController.update = async (req, res) => {
    try {
        let updates = req.body
        let updatedBusiness = await models.business.findOne({
            where: {
                id: req.params.id
            }
        })

        let changedBusiness = await updatedBusiness.update(updates)
        res.json({changedBusiness})
    } catch(error) {
        res.json({error})
    }
}

businessController.delete = async (req, res) => {
    try {
        let closedBusiness = await models.business.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({closedBusiness})
    } catch (error) {
        res.json({error})
    }
}

businessController.find = async (req, res) => {
    try {
        let business = await models.business.findOne({
            where: {
                id: req.params.id
            }
        })
        res.json({dino})
    } catch(error) {
        res.json({error})
    }
}

businessController.findAll = async (req, res) => {
    try {
        let businesses = await models.business.findAll()
        res.json({businesses})
    } catch(error) {
        res.json({error})
    }
}

module.exports = businessController;