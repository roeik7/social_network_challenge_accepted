const express = require('express')
const model_user_personal_details = require('../../collections_models/user_models/user_personal_details')
const router = new express.Router()
const user_achivements_router = require('./user_achivements_router')
const following_model = require('../../collections_models/user_models/following')


//description: called when user try to login to application. this function check if the user name exist and matched this password.
//input: user_name, password
router.get('/login', async (req, res) => {
    try {
        var message = "ivalid user name/password"
        var user = await model_user_personal_details.findOne({
            user_name: req.query.user_name,
            password: req.query.password
        })

        if (user != undefined) {
            message = 'success to login'
        }
        
        res.send({ message: message, image_url: user.image_url })
    }

    catch(e){
        res.send({message:'error to login: '+e})
    }
})

//description: this method called when the user is about to sign up for the app and the method check the user name is unique
//if unique - add him to db
//input user_name, password, image_url
router.post('/sign_up', async (req, res) => {
    var message
    const user = new model_user_personal_details(req.body)

    await model_user_personal_details.findOne({ user_name: user.user_name }, async (error, user) => {
        if (error) {
            console.log('error in user name unique')
            message = error.body
        }

        if (user) {
            message = 'The user name already exists.'
        }

        else {
            const User = new model_user_personal_details(req.body)
            await User.save().then(async () => {
                message = 'success to add new user.'
                await user_achivements_router.add_new_user_to_achivements_table(req.body.user_name)
            }).catch(() => {
                message = 'error to add new user'
            })

        }
        res.json({ message: message })
    })
})


//description: called when user searching users. the searching will be insesitive case
//input: text to search 
router.get('/search', async (req, res) => {
    await model_user_personal_details.find({ user_name: { $regex: '^' + req.query.user_name, $options: 'i' } }).select('user_name image_url').then(async (users) => {
        res.send(users)
    }).catch((e) => {
        res.send('error to search user_name ' + e)
    })
})


module.exports = router