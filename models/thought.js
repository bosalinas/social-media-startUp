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
        createdAt: {
            type: Date,
            default: Date.now,
            toJSON: { getters: true },
        },
        // getter method: get date in JSON format for date
        username: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: true
            },
        ],
        reactions: [reactionSchema]
    }
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema)

module.exports = Thought;