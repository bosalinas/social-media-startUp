const router = require('express').Router();
const {
    getUsers,
    getOneUser,
    createUser,
    deleteUser,
    updateThought
} = require('../../controllers/userController');

// api/users
router.route('/').get(getUsers).post(createUser);
// api/users/:id
router.route('/:userId').get(getOneUser).delete(deleteUser);

router.route('/:userId/thoughts').post(updateThought);

module.exports = router;