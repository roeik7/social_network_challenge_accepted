const mongoose = require('mongoose')


//define the model structure
const records = mongoose.model('records', {
    user_name: {
        type: String,
        required: true
    },
    best_average_speed:{
        type: String,
        default: null
    },
    best_distance:{
        type:String,
        default: null
    },
    best_time:{
        type:String,
        default: null
    },    
    best_score_on_challenge:{
        type:String,
        default: null
    },
    sport_type:{
        type:String,
        required:true
    }

})

module.exports = records