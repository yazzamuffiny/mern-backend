//all the endpoints for our workouts


//bring in express
const express = require('express');

//bring in express's router method
const router = express.Router()


const multer = require("multer")
const path = require("path")

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads'); // Store uploads in this directory
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext); // Use unique filenames
    },
  });
  
  const upload = multer({ storage });


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
router.post('/', upload.single('image'), createWorkout);
//update Workout
router.patch('/:id', updateWorkout)
//delete workout
router.delete('/:id', deleteWorkout);

//export router
module.exports = router;