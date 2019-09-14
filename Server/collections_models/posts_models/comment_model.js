const mongoose = require('mongoose')


//format:
//_id
//post_id
//created
//text
//created_date

//define the model structure
const comment = mongoose.model('comment', {
    
    //foreign key (reference to post in posts_model)
    post_id:{
        type: mongoose.Schema.Types.ObjectId, ref:'post_model',
    },
    created:{
        type:String,
        required:true
    },
    text:{
        type: String,
        required: true
    },
    created_date:{
        type: Date,
        required: true
    }
})

    

module.exports = comment