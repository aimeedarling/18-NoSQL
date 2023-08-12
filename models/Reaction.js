const { Schema, model } = require('mongoose');

const reactionSchema = new Schema ({
    reactionId: {
        type: Schema.Type.ObjectId, ref: 'Thought',
        default:{}
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    toJSON: {
        virtuals: true
    }
});

reactionSchema.virtual('reactionLength').get(function () {
    return this.reactions.length
});

model.exports = Reaction;