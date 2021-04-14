//=============== SETUP ===============//

// grab models
const models = require('../models');

// data encryption
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// controller obj
const userController = {};


//=============== HELPER FUNCTIONS ===============//

// authorize user before every request - called before methods section
userController.authorizeUser = async (req, res, next) =>
{
    try {
        // check if request requires authorization
        if (req.headers.authorization)
        {
            // decrypt user id
            const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
            // grab user
            const user = await models.user.findOne({ where: { id: decryptedId.userId}});
            // allow other requests access user
            req.user = user;
        }
        // no auth headers in request - signup/login requests
        else
        {
            req.user = null;
        }
        
        next();
    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ message: 'user authorization error', error: error.message })
    }
}


//=============== METHODS ===============//

// get all users
userController.getAll = async (req, res) =>
{
    try {
        // grab all users
        const users = await models.user.findAll();
        // check if users exist
        if (users)
        {
            // return users
            res.json({ message: 'users found', users });
        }
        // no users
        else
        {
            res.status(404).json({ error: 'no users found'})
        }
    } catch (error) {
        res.status(400).json({ error: 'could not get users' });
    }
}

// signup
userController.create = async (req, res) =>
{
    try {
        // hash password
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        // create user
        const user = await models.user.create(
        {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        // encrypt id
        const encryptedId = jwt.sign({ userId: user.id}, process.env.JWT_SECRET);
        console.log(encryptedId)
        // return encrypted user id
        res.json({ message: 'signup successfull', userId: encryptedId })
    } catch (error) {
        // check if error is from unqiue email validation
        if (error.message === 'Validation error')
        {
            res.json({ error: 'email already taken'});
        }
        // unknown error
        else
        {
            res.json({ error: error.message });
        }
    }
}

// login
userController.login = async (req, res) =>
{
    try {
        // grab user by email
        const user = await models.user.findOne({ where: { email: req.body.email}});
        // check if passwords match
        if (bcrypt.compareSync(req.body.password, user.password))
        {
            // encrypt id
            const encryptedId = jwt.sign({ userId: user.id}, process.env.JWT_SECRET);
            // return encrypted user id
            res.json({ message: 'login successfull', userId: encryptedId })
        }
        // wrong password
        else
        {
            // status 401 - unauthorized
            res.status(401).json({ error: 'incorrect password' })
        }
    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ message: 'login failed', error: error.message });
    }
}

// get profile
userController.profile = async (req, res) =>
{
    try {
        // grab user
        const user = req.user;
        // check if user exists
        if (user)
        {
            // return user
            res.json({ message: 'user profile found', user })
        }
        // no user
        else
        {
            // status 404 - could not be found
            res.status(404).json({ error: 'no profile found'});
        }
    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'failed to  load profile'});
    }
}

// update profile
userController.update = async (req, res) =>
{
    try {
        // grab user
        const user = req.user;
        // check if user exists
        if (user)
        {
            // update user
            user.update(req.body);
            // return user
            res.json({ message: 'user profile updated', user })
        }
        // no user
        else
        {
            // status 404 - could not be found
            res.status(404).json({ error: 'no profile found'});
        }
    } catch (error) {
        // status 400 - bad request
        res.status(400).json({ error: 'failed to  update profile'});
    }
}

// list business
userController.listBusiness = async (req, res) =>
{
    try {
        // grab business by name
        const business = await models.business.findOne({ where: { name: req.body.business}});
        // check if business exists
        if (business)
        {
            // grab users listed businesses
            const listedBusinesses = await req.user.getBusinesses();
            // check if listed businesses is empty
            if (listedBusinesses.length === 0)
            {
                // list business to user
                req.user.addBusiness(business);
                // return message
                res.json({ message: 'business list successfull', business });
            }
            // not empty
            else
            {
                // check if business is already listed under user
                for (let i = 0; i < listedBusinesses.length; i++)
                {
                    // business already listed
                    if (listedBusinesses[i].id === business.id)
                    {
                        res.json({ message: 'business already listed' });
                        return;
                    }
                    // business not listed
                    if (i === listedBusinesses.length - 1)
                    {
                        // list business to user
                        req.user.addBusiness(business);
                        // return message
                        res.json({ message: 'business list successfull', business });
                    }
                }
            }
        }
        // no business found
        else
        {
            res.status(404).json({ error: 'could not find business' });
        }
    } catch (error) {
        res.status(400).json({ error: 'could not list business' });
    }
}

// get listed businesses
userController.getListedBusiness = async (req, res) =>
{
    try {
        // grab businesses by name
        const businesses = await req.user.getBusinesses();
        // check if businesses exist
        if (businesses)
        {
            res.json({ businesses });
        }
        // no businesses found
        else
        {
            res.status(404).json({ error: 'could not find businesses' });
        }
    } catch (error) {
        res.status(400).json({ error: 'could not get listed businesses' });
    }
}

// delete listed business
userController.deleteListedBusiness = async (req, res) =>
{
    try {
        // grab business by name
        const business = await models.business.findOne({ where: { name: req.body.business}})
        // check if business exist
        if (business)
        {
            // remove business from listed list
            req.user.removeBusiness(business);

            res.json({ message: 'business deleted successfully'});
        }
        // no business found
        else
        {
            res.status(404).json({ error: 'could not find business' });
        }
    } catch (error) {
        res.status(400).json({ error: 'could not delete business' });
    }
}

// post user review
userController.postReview = async (req, res) =>
{
    try {
        // create review
        const review = await models.review.create(
        {
            headline: req.body.headline,
            content: req.body.content,
            rating: req.body.rating
        })
        // add review to user
        req.user.addReview(review);
        // add review to business
        
        // return review
        res.json({ message: 'review posted successfully', review });
    } catch (error) {
        res.status(400).json({ error: 'could not post review' });
    }
}

// delete review
userController.deleteReview = async (req, res) =>
{
    try {
        // grab review by name
        const review = await models.review.findOne({ where: { id: req.body.id}})
        // check if review exist
        if (review)
        {
            // remove review from user
            req.user.removeReview(review);
            // remove review from db
            review.destroy();

            res.json({ message: 'review deleted successfully'});
        }
        // no review found
        else
        {
            res.status(404).json({ error: 'could not find review' });
        }
    } catch (error) {
        res.status(400).json({ error: 'could not delete review' });
    }
}

module.exports = userController;