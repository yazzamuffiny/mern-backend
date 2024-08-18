const Comment = require('../models/commentModel')
const Workout = require('../models/workoutModel')

//create comment
const createComment = async (req, res) => {
    const { workoutId } = req.params //id of the workout to create comment on

    const { text, user_id } = req.body;

    try {
        const workout = await Workout.findById(workoutId);
        
        if(!workout) {
            return res.status(404).json({error: 'Workout not found'})
        }

        if (!text || !user_id) {
            return res.status(400).json({ error: 'Text and user ID are required' });
        }

        const newComment = new Comment({ text, user_id });

        await newComment.save();

        workout.comments.push(newComment);

        await workout.save();

        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server Error'})
    }
}

//edit existing comment
const editComment = async (req, res) => {
    const {workoutId, commentId } = req.params

    try {
        const workout = await Workout.findById(workoutId)

        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        const comment = await Comment.findByIdAndUpdate(
            commentId,
            {
                text: req.body.text,
            },
            {new: true}
        )

        if (!comment) {
            return res.status(400).json({ error: 'Comment not found'})
        }

        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error'})
    }
}

//delete comment
const deleteComment = async (req, res) => {
    const {workoutId, commentId } = req.params

    try {
        const workout = await Workout.findById(workoutId)

        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' })
        }

        const comment = await Comment.findByIdAndRemove(commentId)

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found'})
        }

        workout.comments = workout.comments.filter(
            (comment) => comment.toString() !== commentId
        );

        await workout.save()

        res.status(200).json(comment)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server Error'})
    } 
}

module.exports = { createComment, editComment, deleteComment}