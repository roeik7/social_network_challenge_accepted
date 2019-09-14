const express = require('express')
const model_saved_challenges = require('../../collections_models/challenge_models/saved_challenges')
const model_challenge_general_details = require('../../collections_models/challenge_models/challenge_general_details')
const model_challenge_goals = require('../../collections_models/challenge_models/challenge_goals')
const router = new express.Router()

//input: user_name
//description: return all saved challenge for specific user
router.get('/future_challenges/user_name', (req, res) => {
    console.log("in future challenge")
    const user_name = req.query.user_name

    model_saved_challenges.find({ user_name: user_name }).then(async (challenges) => {

        var future_challenge = []

        for (var challenge of challenges) {
            var temp_challenge = challenge.toObject()

            //console.log(temp_challenge)
            //add to temp_challenge object the icon and challenge criterion
            await model_challenge_general_details.findOne({ _id: challenge._id }).select('icon challenge_criterion challenge_type').then((object) => {
                temp_challenge['type'] = object.challenge_type
                temp_challenge['icon'] = object.icon
                temp_challenge['challenge_criterion'] = object.challenge_criterion
            })

            //add to temp_challenge object the dest time, dest speed, dest distance
            await model_challenge_goals.findOne({ _id: challenge._id }).select('destination_time destination_speed destination distance destination_threshold').then((object) => {
                temp_challenge['destination_time'] = object.destination_time
                temp_challenge['destination_speed'] = object.destination_speed
                temp_challenge['destination_distance'] = object.destination_distance
                temp_challenge['number'] = object.destination_threshold
                //console.log(temp_challenge)
            })

            future_challenge.push(temp_challenge)
        }

        res.send(future_challenge)
    }).catch((error) => {
        res.send(error)
    })
})

//description: when user want to save challenge to the future this function is called 
//and insert the challenge details to saved_Challenge, challenge_general, challenge_goals models
//input: user_name, take_from, challenge_type, challenge_criterion, icon,dest_distance dest_time, dest_speed, dest_distance,video_url
router.post('/insert_future_challenge', async (req, res) => {
    await handle_future_challenge(req.body).then((success)=>{
        console.log(success)
        res.send(success)
    }).catch((e)=>{
        res.send(e)
    })
})



//description: add challenge details to saved challenge model
//input: challenge details (destination, type), user name
const handle_future_challenge = async (challenge_details) => {
    //first- add to challenge_general
    
    console.log('challenge_details from handle future '+challenge_details)
    var message=""
    
    const challenge_general_details = new model_challenge_general_details({
        user_name: challenge_details.user_name,
        challenge_type: challenge_details.challenge_type,
        challenge_criterion: challenge_details.challenge_criterion,
        icon: challenge_details.icon,
        post_id: challenge_details.post_id
    })


    //add to general_deatils model
    await challenge_general_details.save().then(() => {
        console.log('succes add general from future')
    }).catch(() => {
        throw new Error ('error to add to general model')
    })


    //save the challenge_id from challenge_general_model and add the challenge to future challenges
    const challenge_id = challenge_general_details._id
    const destination_threshold = challenge_details.destination_speed ? challenge_details.destination_speed :
        (challenge_details.destination_time ? challenge_details.destination_time : challenge_details.destination_distance)

    const challenge_goals = new model_challenge_goals({
        _id: challenge_id,        
        destination_time: challenge_details.destination_time,
        destination_speed: challenge_details.destination_speed,
        destination_distance: challenge_details.destination_distance,
        destination_threshold: destination_threshold,
        video_url: challenge_details.video_url
    })

    console.log('challenge goals before saving ' +challenge_goals)

    //add to challenge goals model
    await challenge_goals.save().then((challenge_goals_saved)=>{
        console.log('success to add to challenge goals '+challenge_goals_saved)
    }).catch(() => {
        throw new Error('error to add to challenge_goals')
    })

    const future_challenge = new model_saved_challenges({
        _id: challenge_id,
        challenge_id_taken:challenge_details.challenge_id_taken,
        user_name: challenge_details.user_name,
        take_from: challenge_details.take_from,
        challenge_id_taken:challenge_details.challenge_id_taken
    })

    await future_challenge.save().then((challenge) => {
        message= ('success adding future challenge!' + challenge)
    }).catch((error) => {
        throw new Error (error)
    })

    return message
}



//dewscription: when user completed the challenge or want to cancel challenge
//unput: challenge id, user name
const delete_future_challenge = async (challenge_details)=>{
    try{
        const challenge_id= await model_challenge_general_details.findOne({user_name: challenge_details.user_name,
                                                                        post_id:challenge_details.post_id}, ['_id'])
        console.log('challenge_id after try to find by user name and post_id :'+challenge_id)
        await model_saved_challenges.findByIdAndDelete({_id:challenge_id._id})
        await model_challenge_goals.findByIdAndDelete({_id:challenge_id._id})
        const deleted_challenge = await model_challenge_general_details.findByIdAndDelete({_id:challenge_id._id})
        return ({message: 'success to delete challenge', deleted_challenge: deleted_challenge})
    }
    catch(e){
        throw new Error('error to delete challenge: '+e)
    }
}

module.exports = {router, handle_future_challenge, delete_future_challenge}
