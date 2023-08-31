const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find().select('-__v')
            console.log(users)
            res.status(200).json(users)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    // get one user by ID
    async getOneUser(req, res) {
        try {
            const users = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!users) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            res.json({
                users,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
// delete a user by id
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }
            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
// put (update) a user by id
async updateThought(req, res) {
    console.log('You are updating user');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friendId }},
            { new: true, runValidators: true}
        )

        if(!user){
            return res.status(404).json({message:`No user found with this id`});
        }

        res.json(user)
        return;

    } catch(err) {
        res.status(500).json(err);
    }
},

// delete friend
async deleteFriend(req, res) {
    try {
        console.log("error in try:", req.params.userId);
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { new: true }
        )

        if(!user){
            return res.status(404).json({message:`Could not find that user`});
        }

        res.json(user)
        res.json({ message: 'Friend successfully deleted' });
    } catch(err) {
        console.log("error in catch block:", err);
        res.status(500).json(err);
    }
},
};