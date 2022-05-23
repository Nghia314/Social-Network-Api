const router = require('express').Router();
const userRouter = require('./user-routes');
const thoughtsRouter = require('./thought-routes');

router.use('/users', userRouter);
router.use('/thoughts', thoughtsRouter);

module.exports = router;