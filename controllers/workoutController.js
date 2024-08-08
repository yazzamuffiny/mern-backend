//what to do at this specific route

//variable for Workout from workoutModel
const Workout = require('../models/workoutModel');

//import mongoose
const mongoose = require('mongoose')

//define getWorkouts function
const getWorkouts = async (req, res) => {
//-1 in sort will put them on descending order (latest first)
    const workouts = await Workout.find({}).sort({createdAt: -1})
    //status of 200, sending workouts to json
    res.status(200).json(workouts)
}

//define get single workout function
const getWorkout = async (req, res) => {
    //set id variable
    const {id} = req.params

    //check if mongo id is valid
    const workout = await Workout.findById(id);

    //if not workout found show an error
    if(!workout) {
        return res.status(404).json({error: 'No such Workout'});
    }

    //otherwise if workout is found return this
    res.status(200).json(workout);

}


//define create workouts function
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    //add doc to DB
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    }

    catch (error) {
        res.status(400).json({error: error.message})
    }
}

//update workout function
const updateWorkout = async (req, res) => {
    //set up id variable
    const {id} = req.params
    //check if mongo id is valid
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Workout'})
    }

    //fins a work by its id and if it finds it,
    //spread out the properties anc change what it receives,
    //from the request body eg it could be title changed or everything
    const workout = await Workout.findOneAndUpdate(
        {_id: id}, 
        {...req.body},
        {new: true}
    );

    //if it cant find a workout by a valid id
    if(!workout) {
        return res.status(404).json({error: 'No such Workout'});
    }

    //otherwise return updated work
    res.status(200).json(workout);
}

//define delete workout function
const deleteWorkout = async (req, res) => {
    //set up the id variable
    const {id} = req.params
    //check the id is real
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Workout'})
    }
    //find and delete a workout where the id on mongo is equal to the id in the request parameter
    const workout = await Workout.findOneAndDelete({_id: id})
    //if workout doesn't exist, show and error message
    if(!workout) {
        res.status(404).json({error: "No such Workout"})
    }
    //return that the workout is found
    res.status(200).json(workout + ' successfully deleted');
}

module.exports = {
    getWorkouts,
    createWorkout,
    deleteWorkout,
    getWorkout,
    updateWorkout
}