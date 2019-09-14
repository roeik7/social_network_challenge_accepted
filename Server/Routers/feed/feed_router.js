const express = require('express')
const model_user_posts = require('../../collections_models/posts_models/post_model')
const router = new express.Router()
const model_user_general_details = require('../../collections_models/user_models/user_personal_details')
const like_model = require('../../collections_models/posts_models/like_model')
const following_model = require('../../collections_models/user_models/following')
const general_details_router = require('../challenges/challenge_general_details_router')

//description: this request gets user name and return all posts related for this user (his and frinds post)
//input: user_name
//output: all posts specific user created 
router.get('/feed/posts', async (req, res) => {
    try {
        const users_to_show = [req.query.user_name]
        const following = await following_model.find({ user_name: req.query.user_name }).select('follow')

        for (var user of following) {
            var temp_user = user.toObject()
            users_to_show.push(temp_user.follow)
        }

        console.log(users_to_show)


        const posts = await model_user_posts.find({ "created": { "$in": users_to_show } }).sort({ created_date: 'desc' }).limit(20)
        
        var returned_posts = []

        //traverse all posts related to the user and add some info like if the user liked this post, if the user take the challenge
        for (var post of posts) {
            var temp_post = post.toObject()
            var user_like_post = false
            var post_id = post._id
            temp_post['video_url'] = temp_post.video_url
            var user_take_challenge = await general_details_router.user_take_challenge(req.query.user_name, post_id)
            console.log('user take challenge: ' + user_take_challenge)
            temp_post['user_take_challenge'] = user_take_challenge
            const user = await model_user_general_details.findOne({ user_name: post.created })
            temp_post['image_url'] = user.image_url
            

            const like = await like_model.findOne({
                post_id: post_id,
                created: req.query.user_name
            })

            if (like != undefined) {
                user_like_post = true
            }

            temp_post['user_like_post'] = user_like_post

            returned_posts.push(temp_post)
        }
        
        console.log(returned_posts)
        res.send(returned_posts)
    }

    catch (e) {
        res.send(e)
    }
})


module.exports = router