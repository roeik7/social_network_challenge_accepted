const mongoose = require('mongoose')


//define the model structure
const user_personal_details = mongoose.model('user_personal_details', {
    user_name: {
        type: String,
        required: true
    },
    image_url:{
        type: String,

    },
    password: {
        type: String,
        required: true
    }
})

module.exports = user_personal_details