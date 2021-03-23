const router = require('express').Router();

//import all functions
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');


// /api/users
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:id
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


// /api/users/:id/friends/:friendid
router.route('/:id/friends/:friendId')
    .put(addFriend)
    .delete(deleteFriend);


module.exports = router;