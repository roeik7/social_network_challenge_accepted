const express = require('express')
const model_user_posts = require('../../collections_models/posts_models/post_model')
const router = new express.Router()
const model_user_general_details = require('../../collections_models/user_models/user_personal_details')
const like_model = require('../../collections_models/posts_models/like_model')
const following_model = require('../../collections_models/user_models/following')
const user_achivement_model = require('../../collections_models/user_models/user_achivement')
const challenge_general_details_router = require('../challenges/challenge_general_details_router')



//description: list user information (following after, followed by, score)
//input: profile_watched, who_watching
router.get('/info/user', async (req, res) => {
    let returned_info = {}
    let watching_follow_user = false;
    await following_model.count({ user_name: req.query.profile_watched }).then(async (num_of_following) => {
        
        returned_info['following'] = num_of_following
        await following_model.count({ follow: req.query.profile_watched }).then(async (num_of_followed_by) => {
            returned_info['followed_by'] = num_of_followed_by
            await user_achivement_model.findOne({ user_name: req.query.profile_watched }).select('total_score').then(async (score) => {
                returned_info['total_score'] = score.total_score

                await following_model.findOne({ user_name: req.query.who_watching, follow: req.query.profile_watched }).then((follow) => {
                    if (follow != undefined) {
                        watching_follow_user = true;
                    }

                    returned_info['follow_user'] = watching_follow_user
                    res.send(returned_info)
                }).catch((e) => {
                    res.send('error to get if user follow another ' + e)
                })
            }).catch((e) => {
                res.send('error to get score ' + e)
            })
        }).catch((e) => {
            res.send('error in count followed by ' + e)
        })
    }).catch((e) => {
        res.send('error in count following ' + e)
    })
})

//description: when user want to unfollow friend
//input: user_name, follow
router.post('/unfollow', async (req, res) => {
    try {
        const following_deleted = await following_model.findOneAndDelete({ user_name: req.body.user_name, follow: req.body.follow })
        res.send({message:'success to remove following : ' + following_deleted})
    }
    catch (e) {
        res.send({message:'error to delete following: ' + e})
    }

})


//description: list all the followers after specific user
//input: user_name
router.get('/following_specific_user', async (req, res)=>{
    try{
        const users=await following_model.find({follow:req.query.user_name}, ['user_name'])
        res.send(users)
    }
    catch(e){
        res.send({message: 'error to find followers: '+e})
    }
})

//description: add follow to db
//input: user_name, follow
router.post('/follow', (req, res) => {
    const user = new following_model({
        user_name: req.body.user_name,
        follow: req.body.follow
    })

    user.save().then(() => {
        res.send('success to add user to follow db')
    })
})

//decription: when the user watch his own profile. this function list all post related to this user
//input: user_name
router.get('/my_profile/posts', async (req, res) => {
    try {
        const posts = await all_post_for_specific_user(req.query.user_name, req.query.user_name)
        res.send(posts)
    }
    catch (e) {
        res.send({message: 'error to get profile post: '+e})
    }
})

//description: when user watch other profile
//input: user_name_watch, user_name_profile
router.get('/other_profile/posts', async (req, res) => {
    try {
        const posts = await all_post_for_specific_user(req.query.user_name_watch, req.query.user_name_profile)
        res.send(posts)
    }
    catch (e) {
        res.send({message: 'error to get profile post: '+e})
    }
})


//description: list all posts that specific user created
//input: watching user name, profile user name
const all_post_for_specific_user = async (watch, profile_user_name) => {
    try {
        const posts = await model_user_posts.find({ created: profile_user_name }).sort({ created_date: 'desc' })
        var returned_posts = []

        for (var post of posts) {
            let temp_post = post.toObject()
            let user_like_post = false
            let post_id = post._id
            const user = await model_user_general_details.findOne({ user_name: post.created })
            temp_post['image_url'] = user.image_url;

            //check if the user take from him the challenge
            let user_take_challenge = await challenge_general_details_router.user_take_challenge(watch, post_id)
            console.log('user take challenge: ' + user_take_challenge)
            temp_post['user_take_challenge'] = user_take_challenge
            const like = await like_model.findOne({
                post_id: post_id,
                created: watch
            })

            if (like != undefined) {
                user_like_post = true
            }

            temp_post['user_like_post'] = user_like_post

            returned_posts.push(temp_post)
        }

        return returned_posts
    }

    catch (e) {
        throw new Error('error to take posts:' + e)
    }
}


module.exports = router