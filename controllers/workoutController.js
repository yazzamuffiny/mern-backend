//what to do at this specific route

const { response } = require('express')
//variable for Workout from workoutModel
const Workout = require('../models/workoutModel');

//import mongoose
const mongoose = require('mongoose')

//define getWorkouts function
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).populate({
            path:'comments',
            model: 'Comment'
        }).sort({createdAt: -1});
        res.status(200).json(workouts)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
}

//define get single workout function
const getWorkout = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Workout: Id invalid' });
    }

    try {
        // Find the workout by ID and populate the 'comments' array with actual comment documents
        const workout = await Workout.findById(id).populate({
            path: 'comments',
            model: 'Comment' // Reference the Comment model
        });

        if (!workout) {
            return res.status(404).json({ error: 'No such Workout: Workout does not exist' });
        }

        res.status(200).json(workout);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


//define create workouts function
const createWorkout = async (req, res) => {
    const {title, load, reps, user_id} = req.body

    //get uploaded image filename from the req.file object
    const imageFilename = req.file ? req.file.filename : null;

    //add doc to DB
    try {
        const workout = await Workout.create({
            title, 
            load, 
            reps, 
            user_id,
            image: imageFilename 
        })
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
    res.status(200).json(workout);
}

module.exports = {
    getWorkouts,
    createWorkout,
    deleteWorkout,
    getWorkout,
    updateWorkout
}