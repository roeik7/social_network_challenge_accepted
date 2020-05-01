const mongoose = require('mongoose')


//_id refference to same challenge at challenge_goals and saved_challenge 
//define the model structure
const challenge_general_details = mongoose.model('challenge_general_details', {
    user_name: {
        type: String,
        required: true
    },
    challenge_type:{
        type: String,
        required: true
    },

    //speed/time
    challenge_criterion:{
        type: String,
    },
    icon:{
        type: String,
        required: true
    },
    post_id:{
        type: String,
        default:null
    }
})

module.exports = challenge_general_details