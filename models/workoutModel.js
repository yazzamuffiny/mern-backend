//what the data will look like

//call mongoose
const mongoose = require('mongoose');

//call schema
const Schema = mongoose.Schema

//create schema
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, {timestamps: true});

                    //creating model called Workout, use workoutSchema as the rules
module.exports = mongoose.model('Workout', workoutSchema);