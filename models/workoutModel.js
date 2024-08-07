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
    }
}, {timestamps: true});

                    //creating model called Workout, use workoutSchema as the rules
module.exports = mongoose.model('Workout', workoutSchema);