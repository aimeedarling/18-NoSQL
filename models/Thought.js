const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    username: {
        type: String,
        required: true
    },
    reactions:
        [{type: Schema.Types.ObjectId, ref: 'Reaction'}],
    toJSON: {
        virtuals: true
    }
});


thoughtSchema.formatTime

thoughtSchema.virtual('reactionLength').get(function(){
    return this.reactions.length
});

const Thought = model('Thought', thoughtSchema);

model.exports = Thought;