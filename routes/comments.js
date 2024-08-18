const express = require('express')
const router = express.Router()

const {
    createComment,
    editComment,
    deleteComment,

} = require('../controllers/commentController');

//new comment for specific workout
router.post('/workouts/:workoutId/comments', createComment);

//edit existing comment
router.patch('/workouts/:workoutId/comments/:commentId', editComment);

//delete existing comment
router.delete('/workouts/:workoutId/comments/:commentId', deleteComment);

module.exports = router;