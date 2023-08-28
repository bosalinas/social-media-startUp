const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find()
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get single thought by id
  async getOneThought(req, res) {
    try {
      const thoughts = await Thought.findOne({_id: req.body.thoughtId})
        .select('-__v');
      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with that id'})
      }
      res.json({
        thoughts
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // post new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      // const updatedUser = await User.findOneAndUpdate(req.body.thoughts);
      res.json(thought);
      // res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // update thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};