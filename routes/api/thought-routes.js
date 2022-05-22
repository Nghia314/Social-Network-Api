const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    updateThoughts,
    createThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughts-controller');

router.route('/').get(getAllThoughts);

router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts);

router.route('/:userId').post(createThoughts);

router.route('/:thoughtId/reaction').post(addReaction);


router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);

module.exports = router;