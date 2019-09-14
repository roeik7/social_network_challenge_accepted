const mongoose = require('mongoose')


//format:
//_id
//post_id
//created

//define the model structure
const like = mongoose.model('like', {
    
    //foreign key (reference to post in posts_model)
    post_id:{
        type: mongoose.Schema.Types.ObjectId, ref:'post_model',
    },
    created:{
        type:String
    }
})

    

module.exports = like