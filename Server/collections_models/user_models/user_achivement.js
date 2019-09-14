const mongoose = require('mongoose')


//define the model structure
const user_achievements = mongoose.model('user_achivement', {
    user_name: {
        type: String,
        required: true
    },
    total_score: {
        type: Number,
        required: true
    },
    failed_challenge:{
        type: Number
    },
    success_challenge:{
        
    },
    average_score_per_challenge:{
        type: Number
    },
    best_average_speed:{
        type: Number,
        default: 0
    },
    best_distance:{
        type:Number,
        default: 0
    },
    best_time:{
        type:Number,
        default: 0
    },    
    best_score_on_challenge:{
        type:Number,
        default: 0
    }
})



module.exports = user_achievements