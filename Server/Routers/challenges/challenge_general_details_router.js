const express = require('express')
const model_challenge_general_details = require('../../collections_models/challenge_models/challenge_general_details')
const model_challenge_goals = require('../../collections_models/challenge_models/challenge_goals')
const model_saved_challenge = require('../../collections_models/challenge_models/saved_challenges')
const router = new express.Router()
const user_achivements_router = require('../user/user_achivements_router')
const posts_model = require('../../collections_models/posts_models/post_model')
const saved_challenge_router=require('./saved_challenge_router')
const post_router = require('../post/posts_router')



//description: when user want to start new challenge
//output: challenges types
router.get('/choose_challenge_to_complete', (req, res) => {
    
    //send to client json object of json's array
    res.json({
        "challenges_to_complete": [
            { "type": "run", "challenge_criteria": ["speed", "time", "distance"] },
            { "type": "bicycle", "challenge_criteria": ["speed", "time", "distance"] },
            { "type": "video", "challenge_criteria": "video" }
        ]
    })
})



//description: invoked when challenge ending and check if the user success to achieve the destiny. handle the post creation, update scores, check for new records.
//input: user_name, challenge_id (if future challenge), challenge_for(user challenge another user) exist(bool), challenge_type(run, swim..), challenge_criterion(time, speed), actual time, actual distance, dest_time, dest_speed 
router.post('/end_of_challenge', async (req, res) => {
    try {
        let post_id = null
        let challenge_id = req.body.challenge_id
        console.log('insert end of challenge details');
        const challenge_result = await challenge_is_complete_and_update_score(req.body)

        //if not from saved challenge then insert new challenge details to db (challenge goals, general_details) 
        if (!req.body.exist) {
            challenge_id = await add_new_challenge(req.body, challenge_result.completed)
            console.log('success to add new challenge. the user complete the challenge: ' + challenge_result.completed)
        }


        //if complete the challenge create success challenge post 
        if (challenge_result.completed) {
            console.log('before create post')
            post_id = await post_router.create_success_challenge_post(req.body, challenge_result, challenge_id) 
            
            //if the user want to challenge another user - add the challenge details into db (related to the user who challenged)
            if(req.body.challenge_for!=null){
                const icon_object = await model_challenge_general_details.findById({_id:challenge_id}, ['icon'])
                console.log('icon objecct: '+icon_object)
                console.log('icon: '+icon_object.icon)

                saved_challenge_router.handle_future_challenge(
                    {
                    challenge_id_taken:challenge_id,
                    take_from:req.body.user_name,
                    user_name:req.body.challenge_for, 
                    challenge_type:req.body.challenge_type,
                    challenge_criterion:req.body.challenge_criterion,
                    icon: icon_object.icon,
                    post_id:null,
                    destination_time:req.body.destination_time,
                    destination_speed:req.body.destination_speed,
                    destination_distance:req.body.destination_distance,
                    video_url:req.body.video_url
                })
            }
        }

        //if exist - delete the challenge from the future challenge
        if (req.body.exist) {

            await model_saved_challenge.findOneAndDelete({ _id: req.body.challenge_id })
            await model_challenge_goals.findByIdAndUpdate({ _id: req.body.challenge_id }, {
                completed: challenge_result.completed
            })
            console.log('success to update future challenge to: ' + challenge_result.completed + ' id: ' + req.body.challenge_id)

        }

        const message = 'success to update challenge for: ' + req.body.user_name
        
        res.send({ message: message, challenge_id: challenge_id, post_id: post_id })
    }

    catch (error) {
        res.send({ message: 'error at check new challenge: ' + error })
    }
})

//description: check if user take specific challeneg 
const user_take_challenge = async (user_name, post_id) => {
    let is_take = true
    const user = await model_challenge_general_details.findOne({ user_name: user_name, post_id: post_id })

    if (user == undefined) {
        is_take = false
    }

    return is_take
}


//challenge details at this format:
//     user_name
//     challenge_type: 
//     challenge_criterion:
//     dest_speed:
//     dest_time:
//     actual_time:
//     actual_distance:



//description: add to challenge_general_details collection new challenge details
//input: challenge deatils (user name, challenge type)
const create_and_add_general_details_doc = async (challenge_details) => {
    try {
        let icon_to_update = ""
        const challenge_type = challenge_details.challenge_type.toUpperCase()

        switch (challenge_type) {
            case 'RUN':
                icon_to_update = 'running'
                break;
            case 'VIDEO':
                icon_to_update = 'video'
                break;
            case 'BICYCLE':
                icon_to_update = "bicycle"
                break;
        }


        const challenge_to_add = new model_challenge_general_details({
            user_name: challenge_details.user_name,
            challenge_type: challenge_details.challenge_type,
            challenge_criterion: challenge_details.challenge_criterion,
            icon: icon_to_update
        })

        await challenge_to_add.save().catch((e) => {
            throw new Error('error to save general challeng ' + e)
        })

        console.log('challenge id in general: ' + challenge_to_add._id)
        return challenge_to_add.id
    }
    catch (e) {
        throw new Error('error in add to general ' + e)
    }
}


//description: add to challenge_goals collection new challenge
//input: challenge goals (destination, type), challenge id, completed(booalen)
const create_and_add_chalenge_goals_doc = async (challenge_details, challenge_id, completed) => {
    try {
        const challenge_goals = new model_challenge_goals({
            _id: challenge_id,
            destination_time: challenge_details.destination_time,
            destination_speed: challenge_details.destination_speed,
            destination_distance: challenge_details.destination_distance,
            actual_time: challenge_details.actual_time,
            actual_distance: challenge_details.actual_distance,
            video_url: challenge_details.video_url,
            completed: completed
        })

        await challenge_goals.save().then(() => {
            return 'success to add challenge goals'
        }).catch((e) => {
            throw new Error('error to add challenge goals ' + e)
        })
    }
    catch (e) {
        throw new Error('error in add challenge_goals')
    }
}


const add_new_challenge = async (challenge_details, completed) => {
    const challenge_id = await create_and_add_general_details_doc(challenge_details)
    console.log('challenge_id =' + challenge_id)
    await create_and_add_chalenge_goals_doc(challenge_details, challenge_id, completed)
    return challenge_id
}


//description: called when challenge is completed. this function update his score by his performance
//input: challenge performance, user name
const challenge_is_complete_and_update_score = async (challenge_details) => {
    let completed = false
    let actual = 0
    let destination = 0
    const is_video = challenge_details.video_url != null ? true : false
    let challenge_type = ""
    let average_speed = null
    
    //if its not video the score calculated different
    if (!is_video) {
		
        switch (challenge_details.challenge_criterion) {
            case 'time':
                completed = challenge_details.actual_time <= challenge_details.destination_time
                actual = challenge_details.actual_time
                destination = challenge_details.destination_time
                challenge_type = 'time'
                break;
            case 'distance':
                completed = challenge_details.actual_distance >= challenge_details.destination_distance
                actual = challenge_details.actual_distance
                destination = challenge_details.destination_distance
                challenge_type = 'distance'
                break;
            case 'speed':
                average_speed = await calc_average_speed_by_time_and_distance(challenge_details.actual_time, challenge_details.actual_distance)
                console.log('destination speed: ' + challenge_details.destination_speed)
                completed = average_speed >= challenge_details.destination_speed
                actual = average_speed
                destination = challenge_details.destination_speed
                console.log('completes: ' + completed + ' average: ' + average_speed)
                challenge_type = 'speed'
                break;
        }
    }

    else {
        completed = true
        actual = 0
        destination = 0
        challenge_type = 'video'
    }

    //update score in user_achivemtns router
    const score = await user_achivements_router.update_achivements(challenge_details.user_name, completed, actual, destination, challenge_type)

    //check for new records
    if (completed&&!is_video) {
        await user_achivements_router.update_records({user_name:challenge_details.user_name, score: score, average_speed:average_speed, 
            distance:challenge_details.actual_distance, time:challenge_details.actual_time, challenge_criterion:challenge_type, 
            sport_type:challenge_details.challenge_type})
    }

    console.log("score: " + score)

    console.log('before return complete: ' + completed +'destination: '+destination+' actual: '+actual)
    return { completed, score, actual, destination }
}


//calc average speed
const calc_average_speed_by_time_and_distance = async (time, distance) => {
    return distance / time * 60
}



module.exports = { router, user_take_challenge }