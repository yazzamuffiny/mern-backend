//all the endpoints for our workouts


//bring in express
const express = require('express');

//bring in express's router method
const router = express.Router()

//import controllers
const {
    getWorkouts,
    createWorkout,
    deleteWorkout,
    getWorkout,
    updateWorkout
} = require('../controllers/workoutController');

//define routes using http request
//get all workouts
router.get('/', getWorkouts);
//get single workout
router.get('/:id', getWorkout);
//create new workout
router.post('/', createWorkout);
//update Workout
router.patch('/:id', updateWorkout)
//delete workout
router.delete('/:id', deleteWorkout);

//export router
module.exports = router;