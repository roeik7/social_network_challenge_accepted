const mongoose = require('mongoose')


//define the model structure
const following = mongoose.model('following', {
    user_name:{
        type: String,
        require:true

    },
    follow:{
        type:String,
        require:true
    }
})


module.exports = following