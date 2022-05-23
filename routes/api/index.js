const router = require('express').Router();
const usersRouter = require('./user-routes');
const thoughtsRouter = require('./thought-routes');

router.use('/users', usersRouter);
router.use('/thoughts', thoughtsRouter);

module.exports = router;