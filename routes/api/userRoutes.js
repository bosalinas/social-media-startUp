const router = require('express').Router();
const {
    getUsers,
    getOneUser,
    createUser,
    deleteUser,
    updateThought,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// api/users
router.route('/')
.get(getUsers)
.post(createUser);

// api/users/:id
router.route('/:userId')
.get(getOneUser)
.delete(deleteUser);

// api/users/:id/thoughts
router.route('/:userId/thoughts')
.post(updateThought);

// api/users/:id/friends/:friendId
router.route('/:userId/friends/:friendId')
.put(addFriend)
.delete(deleteFriend);

module.exports = router;