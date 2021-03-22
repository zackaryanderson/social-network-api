const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //validataion: //figure this out
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


//make virtual to count number of thoughts attached to a user
UserSchema.virtual('friendCount').get(function () {
    return this.thoughts.reduce((total, thought) => total + thought.length + 1,0);
});

//make model out of schema
const User = model('User', UserSchema);

module.exports = User;