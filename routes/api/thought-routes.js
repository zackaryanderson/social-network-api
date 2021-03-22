const router = require('express').Router();

//import all functions
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    postReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/')
.get(getAllThoughts)
.post(createThought);

// /api/thoughts/:id
router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:id/reactions')
.post(postReaction)
.delete(deleteReaction);

module.exports = router;