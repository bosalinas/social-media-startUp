const router = require('express').Router();
const {
    getUsers,
    getOneUser,
    createUser,
    // deleteUser
} = require('../../controllers/userController');

// api/users
router.route('/').get(getUsers).post(createUser);
// api/users/:id
router.route('/:userId').get(getOneUser)
// .delete(deleteUser);

module.exports = router;