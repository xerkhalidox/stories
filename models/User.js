const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    google_id: {
        type: String,
        required: true
    },
    display_name: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('User', user_schema)