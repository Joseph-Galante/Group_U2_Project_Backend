const models = require('../models')

const businessController = {}


businessController.find = async (req, res) => {
    try {
        let business = await models.business.findOne({
            where: {
                id: req.params.id
            }
        })
        res.json({business})
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

businessController.getAllReviews = async (req, res) => {
    try {
        let reviewSearch = await models.business.findOne({

            where: {
                id: req.params.id
            }

        })
        
        const reviews = await reviewSearch.getReviews()
        res.json({reviews})
    } catch (error) {
        res.json({error})
    }
}

module.exports = businessController;