const { Schema, model } = require('mongoose');
const thoughtsSchema = require('./thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //must match validation email address in db
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }],
    },
);
// virtual: return a value that is not in the db. 
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});


const User = model('user', userSchema)

module.exports = User;