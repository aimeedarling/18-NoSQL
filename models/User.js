const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email"
        }
    },
    thoughts: [{type: Schema.Types.ObjectId, ref: 'Thought'}],
    //array of _id va;ues referencing the User model (self-reference)
    friends: [{type: Schema.TypesObjectId, ref: 'User'}],
    toJSON: {
        virtuals: true
    }
});

//virtual friendCount retrieves the length of the user's friends array

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

//initialize our User schema
const User = model('User', userSchema);

module.exports = User;