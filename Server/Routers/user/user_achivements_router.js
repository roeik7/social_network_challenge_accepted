const express = require('express')
const model_user_achivements = require('../../collections_models/user_models/user_achivement')
const model_user_records = require('../../collections_models/user_models/records')
const router = new express.Router()



//model:
//user_name
//total_score
//failed_challenge
//success_challenge
//average_score_per_challenge

//description: invoked when user finished and completed the challenge. update his score and check records by the challenge performance.
//input: user name, completed(booalen), actual performance, destination
router.post('/update_score', (req, res) => {
    console.log(req.body)
    update_achivements(req.body.user_name, req.body.completed, req.body.actual, req.body.destination).then(() => {
        res.send('success to update usr score.')
    }).catch((e) => {
        console.log(e)
    })
})

//description: when user sign up to the application, this function called and add him to the achivemants table
//input: user name
const add_new_user_to_achivements_table = async (user_name) => {
    try {
        console.log('add new user to achivements table')
        const user = new model_user_achivements({
            user_name: user_name,
            total_score: 0,
            failed_challenge: 0,
            success_challenge: 0,
            average_score_per_challenge: 0
        })
        await user.save()
        console.log('user save to achivemtnts table')
        await initialize_records(user_name)
    }
    catch (e) {
        throw new Error('error to add new user to achivements: '+e)
    }
}


//description: initialize records for new user (1 for bicycle and 1 for run)
//unput: user name 
const initialize_records = async (user_name) => {
    try {
        console.log('initialize records')
        const bicycle_records = await new model_user_records({
            user_name: user_name,
            sport_type: 'bicycle'
        })

        const run_records = await new model_user_records({
            user_name: user_name,
            sport_type: 'run'
        })

        console.log('before saving bicycle')
        await bicycle_records.save()
        console.log('save to bicycle recors')
        await run_records.save()
        console.log('save to run recors')
    }
    catch (e) {
        throw new Error('error to initialize records: ' + e)
    }

}

//description: when user succeded his challenge this function calculate the score to add. 
//And rewarding him even more if he succeeded more than he set himself
//input: user name, completed(booalen), actual performance, destination
const update_achivements = async (user_name, completed, actual, destination) => {
    try {
        const success = completed ? 1 : 0
        const score_to_add = success * (5 + 2 * Math.abs(actual - destination)) //5 to succes challenge + 2 * (improvement from the destination)
        console.log('in update score user name: ' + user_name)
        console.log('score_to_add: '+score_to_add)
        const user = await model_user_achivements.findOne({ user_name: user_name })
        const new_score = (user.total_score + score_to_add).toFixed(0)
        const failed = user.failed_challenge + (1 - success)
        const succesed = user.success_challenge + success
        const average_per_challenge = new_score / (failed + succesed)
        
        //find the user who completed the challenge
        await model_user_achivements.findOneAndUpdate({ "user_name": user_name }, {
            "$set": {
                "total_score": new_score,
                "failed_challenge": failed,
                "success_challenge": succesed,
                "average_score_per_challenge": average_per_challenge
            }
        })

        console.log('success to update user score. user: ' + user)
        return score_to_add

    }

    catch (e) {
        console.log('error to update score ' + e)
    }
}

//description: list all records related to specific user
//input:user_name
router.post('/records', async (req, res) => {
    const all_records_for_specific_user = await model_user_records.find({user_name:req.body.user_name})
    res.send(all_records_for_specific_user)
})


//description: add score for specific user
//input: user name, score to add
const add_score = async (user_name, score_to_add)=>{
    console.log('user_name in add score: '+user_name)
    const user_achivements = await model_user_achivements.findOneAndUpdate({user_name:user_name}, { $inc: { total_score: score_to_add }})
    return console.log(user_achivements)
}


//description: when user succeded his challenge this function check if new records are broken
//input: challenge performance
const update_records = async (challenge_details) => {
    try {
        console.log('in update records')
        const sport_type = challenge_details.sport_type.toLowerCase()
        const user_records = await model_user_records.findOne({ user_name: challenge_details.user_name, sport_type:sport_type })
        console.log('user_records: '+user_records)
        const best_time=user_records.best_time==null || challenge_details.time>user_records.best_time?challenge_details.time.toFixed(0):user_records.best_time
        console.log('after best time')
        const best_distance=user_records.best_distance==null || challenge_details.distance>user_records.best_distance?challenge_details.distance.toFixed(0):user_records.best_distance
        console.log('efter best distance')
        const best_average_speed = challenge_details.average_speed!=null &&(user_records.best_average_speed==null || challenge_details.average_speed>user_records.best_average_speed)? 
        challenge_details.average_speed.toFixed(0) : user_records.best_average_speed
        console.log('after speed')
        const best_score_on_challenge = user_records.best_score_on_challenge==null || challenge_details.score>user_records.best_score_on_challenge?challenge_details.score.toFixed(0):user_records.best_score_on_challenge
        console.log('after score')
        console.log('best_time: '+best_time+' best distance: '+best_distance+'best average speed: '+best_average_speed+' best score: '+best_score_on_challenge)
        
        await model_user_records.findOneAndUpdate({ "user_name": challenge_details.user_name,sport_type:sport_type }, {
            "$set": {
                "best_time": best_time,
                "best_average_speed": best_average_speed,
                "best_distance": best_distance,
                "best_score_on_challenge": best_score_on_challenge
            }
        })

        const all_sport_types=await model_user_records.find({user_name:challenge_details.user_name})

        return all_sport_types
    }
    catch (e) {
        throw new Error('error in update records: ' + e)
    }

}

module.exports = { router, update_achivements, add_new_user_to_achivements_table, update_records, add_score }