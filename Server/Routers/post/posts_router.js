const express = require('express')
const model_user_posts = require('../../collections_models/posts_models/post_model')
const router = new express.Router()
const like_model = require('../../collections_models/posts_models/like_model')
const model_comment = require('../../collections_models/posts_models/comment_model')
const model_user_general_details = require('../../collections_models/user_models/user_personal_details')
const model_challenge_general_details = require('../../collections_models/challenge_models/challenge_general_details')
const model_challenge_goals = require('../../collections_models/challenge_models/challenge_goals')
const saved_challenge_router = require('../challenges/saved_challenge_router')
const achivemnts_router = require('../user/user_achivements_router')


//description: this request called when the user want to cancel his joining to challenge
//input: post_id, user_name
router.post('/unchallenge', async (req, res) => {
    try {
        //delete challenge from saved_challenge collection
        const deleted_challenge = await saved_challenge_router.delete_future_challenge(req.body)
        console.log('deleted challenge:' + deleted_challenge)
        await decrement_challenge_from_post(req.body.post_id)
        res.send({ message: 'success to delete challenge', deleted_challenge: deleted_challenge })
    }
    catch (e) {
        res.send({ message: 'error to delete challenge ' + e })
    }
})


//description: this function decrement the field "added challenge" from the post of the user created this challenge
//input: post_id
const decrement_challenge_from_post = async (post_id) => {
    try {
        await model_user_posts.findByIdAndUpdate({ _id: post_id }, { $inc: { added_as_challenge: -1 } })
    }
    catch (e) {
        throw new Error('error to decrement added as challenge in post ' + e)
    }
}


//description: this function create the text after user succeed in his challenge
//input: Information on user performance in the challenge he made 
const create_success_challenge_message = async (challenge_details, challenge_result) => {
    try {
        var message = ""
        const new_line = '\r\n'
        
        //check if its video challenge
        if(! challenge_details.hasOwnProperty('video_url') ){
            message = 'I succeeded! '+ 'Challenge type: ' + challenge_details.challenge_type + new_line
            //+ 'Challenge criterion: ' + challenge_details.challenge_criterion + new_line +
            +'My destination ' + challenge_details.challenge_criterion + ': ' + challenge_result.destination
            + ' my actual ' + challenge_details.challenge_criterion + ': ' + challenge_result.actual

            console.log('message: '+message)
        }

        else{
            console.log('video challenge')
            message='I succeeded!' + ' Challenge type: ' + challenge_details.challenge_type
        }

        return message
    }

    catch (e) {
        throw new Error('Error in create success challenge message: ' + e)
    }

}

//description: this function create success challenge post text and then add it to db
//input: challenge performance, challenge id, personal details 
const create_success_challenge_post = async (challenge_details, challenge_result, challenge_id) => {
    try {
        const message = await create_success_challenge_message(challenge_details, challenge_result)
        console.log('in post creation.')
        const date = new Date()
        const post = new model_user_posts({
            created: challenge_details.user_name,
            post_type: 'challenge',
            text: message,
            video_url: challenge_details.video_url,
            created_date: date,
            challenge_id: challenge_id
        })



        await post.save()
        console.log('success to add challenge post to db')
        return post._id
    }
    catch (e) {
        throw new Error('error to create challenge post :' + e)
    }
}


//description: called when the user join to a friend challenge and add the challenge and user details to db 
//(models: save_challenge, general_details, challenge_goals) 
//input: user_name, post_id
router.post('/take_challenge', async (req, res) => {
    var challenge_details = {}
    //await update_score_for_popular_challenge(req.body.post_id)
    await model_user_posts.findByIdAndUpdate({ _id: req.body.post_id }, { $inc: { added_as_challenge: 1 } })
    await model_user_posts.findById({ _id: req.body.post_id }).select('created challenge_id').then(async (post_details) => {
        achivemnts_router.add_score(post_details.created, 5)
        challenge_details['user_name'] = req.body.user_name
        console.log('challenge_id: ' + post_details._id)

        //find the challenge details and copt them to the user who joined the challenge
        await model_challenge_general_details.findById({ _id: post_details.challenge_id }).then(async (challenge) => {
            console.log('challenge after find in general challenge: ' + challenge)
            var temp_challenge = challenge.toObject()
            challenge_details['challenge_id_taken'] = temp_challenge._id
            challenge_details['take_from'] = temp_challenge.user_name
            challenge_details['challenge_type'] = temp_challenge.challenge_type
            challenge_details['challenge_criterion'] = temp_challenge.challenge_criterion
            challenge_details['icon'] = temp_challenge.icon
            challenge_details['post_id'] = req.body.post_id
            console.log('returned value: ' + challenge_details)


            console.log('challenge id before call challenge goals ' + post_details.challenge_id)
            await model_challenge_goals.findById({ _id: post_details.challenge_id }).then(async (challenge_goals) => {
                var temp_challenge_goals = challenge_goals.toObject()
                challenge_details['destination_time'] = temp_challenge_goals.destination_time
                challenge_details['destination_speed'] = temp_challenge_goals.destination_speed
                challenge_details['destination_distance'] = temp_challenge_goals.destination_distance
                challenge_details['video_url'] = temp_challenge_goals.video_url
                //console.log('challenge details: '+challenge_details)
            })
        })

    }).then(() => {
        saved_challenge_router.handle_future_challenge(challenge_details).then((success) => {
            res.send(success)
        }).catch((e) => {
            res.send(e)
        })
    }).catch((e) => {
        res.send('error in take challenge ' + e)
    })

})


//description: called when the user want to unlike post. the function will remove this like info from the db
//input: post_id, who like
router.post('/unlike', async (req, res) => {
    try {
        await like_model.findOneAndDelete({ post_id: req.body.post_id, created: req.body.created })
        const updated_post = await model_user_posts.findByIdAndUpdate({ _id: req.body.post_id }, { $inc: { likes: -1 } })
        res.send('unlike update successfully: ' + updated_post)
    }
    catch (e) {
        res.send('error to unlike: ' + e)
    }
})

//description: this function called when the front want to list all comments related to specific post
//input: post_id
router.get('/comments/id', async (req, res) => {
    try {
        var returned_comments = []
        const comments = await model_comment.find({ post_id: req.query.post_id }).sort({ created_date: 'desc' })
        for (var comment of comments) {
            var temp_comment = comment.toObject()
            var image_object = await model_user_general_details.findOne({ user_name: temp_comment.created })
            temp_comment['image_url'] = image_object.image_url
            //console.log(temp_comment)
            returned_comments.push(temp_comment)
        }

        res.send(returned_comments)
    }

    catch (e) {
        res.send({ message: e })
    }

})

//description: add comment info to db (text, created etc.)
//input: post_id, created, text, created_date

router.post('/add_comment', async (req, res) => {

    try {
        const comment = new model_comment({
            post_id: req.body.post_id,
            created: req.body.created,
            text: req.body.text,
            created_date: req.body.created_date
        })
        const image_object = await model_user_general_details.findOne({ user_name: req.body.created }, ['image_url'])
        const comment_added = await comment.save()
        await model_user_posts.findOneAndUpdate({ _id: req.body.post_id }, { $inc: { comments: 1 } })
        res.send({ message: 'success to add comment', comment_added: comment_added, image_url: image_object.image_url })
    }

    catch (e) {
        res.send({ message: 'error to add comment to db ' + e })

    }
})

//description: add like info to db
//input: post_id, created
router.post('/add_like', (req, res) => {
    const like = new like_model({
        post_id: req.body.post_id,
        created: req.body.created
    })

    like.save().then(async () => {
        //console.log(like)
        await model_user_posts.findOneAndUpdate({ _id: req.body.post_id }, { $inc: { likes: 1 } }).then(() => {
            res.send('success to add like to db')
        })
    }).catch((e) => {
        res.send('error to add like to db ' + e)
    })
})


//dectiption: called when user created post and add the post info to db
//post format: created ,post_type (challenge/free status), text, video_url, default likes, default comments, 
//added_as_challenge, created_date
router.post('/create_post', (req, res) => {
    create_new_post(req.body).then(() => {
        console.log('new post added successfully!')
        res.send('success to add post.')
    }).catch((e) => {
        res.send('error to add new post. ' + e)
    })
})

const create_new_post = async (post_details) => {
    const post = new model_user_posts({
        created: post_details.created,
        post_type: post_details.type,
        text: post_details.text,
        video_url: post_details.video_url,
        created_date: post_details.created_date
    })

    post.save()
}



module.exports = {router,create_success_challenge_post}