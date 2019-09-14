const mongoose = require('mongoose')



//challenge id reference to same challenge at challenge_general_details and saved_challenge (foreign key) 
//define the model structure
const challenge_goals = mongoose.model('challenge_goals', {
   challenge_id:{
        type: mongoose.Schema.Types.ObjectId, ref:'challenge_general_details',
        //required:true
   },
   destination_time:{
       type: Number,
   },
   destination_speed:{
       type:Number,
   },
   destination_distance:{
       type:Number,
   },
   actual_time:{
       type: Number
   },
   actual_distance:{
       type:Number
   },
   completed:{
       type: Boolean,
       default: false
   },
   destination_threshold:{
       type: Number
   },
   video_url:{
       type: String,
       default: ""
   }
})

module.exports = challenge_goals