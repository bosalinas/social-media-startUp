const { ObjectId } = require('mongoose').Types;
const { User, Thought, reactionSchema } = require('../models');

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
      const thoughts = await Thought.findOne({ _id: req.body.thoughtId })
        .select('-__v');
      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with that id' })
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

      const updatedUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      )
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // update thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thought._id },
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

  // POST to create a reaction stored in thoughts array field
  async createReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body }},
        { runValidators: true, new: true }
      );

      res.json(reaction);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // DELETE to pull and remove a reaction by the reaction's reactionId value
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndDelete(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId }}},
        {runValidators: true, new: true }
        );
    
      if (!reaction) {
        res.status(404).json({ message: 'No reaction with that ID' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
}
};