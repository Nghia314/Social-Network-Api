const router = require('express').Router();

const {
    getAllUsers,
    createUser,
    getUsersById,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUsersById).put(updateUser).delete(deleteUser);

router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);


module.exports = router;