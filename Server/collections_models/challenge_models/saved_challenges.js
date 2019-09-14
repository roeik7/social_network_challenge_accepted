const mongoose = require('mongoose')


//challenge id reference to same challenge at challenge_general_details and challenge_goals (foreign key)
//define the model structure
const saved_challenges = mongoose.model('saved_challenges', {
   challenge_id:{
      type: mongoose.Schema.Types.ObjectId, ref:'challenge_general_details',
      //required:true
   },
   
   user_name:{
    type: String,
    required: true
   },
   
   take_from:{
      type: String,
      default:""
   },
   
   challenge_id_taken:{
      type: String
   }
    
})

module.exports = saved_challenges