const mongoose = require('mongoose')


//format:
//created
//post_type:  (challenge/free status)
//text
//image_url
//likes
//comments
//added_challenge   


//define the model structure
const post = mongoose.model('post', {
    created: {
        type: String,
        required: true
    },
    
    post_type:{     //challenge/free status
        type: String,
        required:true
    },
    text:{
        type: String,
        required: true
    },
    video_url:{
        type: String,
        defalut: null
    },
    challenge_id:{
        type: mongoose.Schema.Types.ObjectId, ref:'challenge_general_details',
    },
    likes: {
        type: Number,
        default: 0
    },
    comments:{
        type: Number,
        default: 0
    },
    added_as_challenge:{
        type: Number,
        default: 0
    },
    created_date:{
        type: Date,
        require: true
    }
})

    

module.exports = post