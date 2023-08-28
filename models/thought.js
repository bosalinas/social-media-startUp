const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
// getter method: get date in JSON format for date
        createdAt: {
            type: Date,
            default: Date.now,
            toJSON: { getters: true },
        },
        username: {
            type: String, 
            required: true,
        },
        reactions: [reactionSchema]
    }
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema)

module.exports = Thought;