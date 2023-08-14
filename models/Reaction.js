const { Schema, model } = require('mongoose');
const { format_date } = require('../utils/helpers')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
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
            default: () => Date.now(),
            get: (ts) => format_date(ts)
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

reactionSchema.virtual('reactionLength').get(function () {
    return this.reactions.length
});

module.exports = reactionSchema;