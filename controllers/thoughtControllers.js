const { Thought, User } = require('../models')

module.exports = {

    //GET to get all thoughts
    async getThoughts (req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts);
            console.log(thoughts)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //GET a single thought by its _id
    async getSingleThought (req,res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v')
            if(!thought) {
                return res.status(404).json({message: 'No thought with that ID'})
            }
            res.json(thought)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    //example data 
    // {
    //     "thoughtText": "Here's a cool thought...",
    //         "username": "lernantino",
    //             "userId": "5edff358a0fcb779aa7b118b"
    // }
    async createThought(req,res) {
        try {
            const thought = await Thought.create(req.body)
            const user = await User.findOneAndUpdate(
                {username: req.body.username},
                {$push: {thoughts: thought._id}},
                {new: true}
                )
                if(!user) {
                    return res.status(404).json({message: 'User not found.'})
                }
            res.json(thought)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    } ,

    //PUT to update a thought by its _id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId }, 
                {$set: req.body}, 
                {runValidators: true, new: true})
                    .select('-__v')

            if(!thought) {
                res.status(404).json({message: "No such thought"})
            }
            res.json(thought)
        } catch (error) {
            res.status(500).json(error)
        }
    },


    //DELETE to remove a single thought by its _id
    async deleteThought(req,res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
            console.log(thought)
            if(!thought) {
                res.status(404).json({ message: 'No such thought exists' });
            }

            //remove from users thoughts array
            const user = await User.findOneAndUpdate(
            { username: thought.username},
            {$pull: {thoughts: thought._id}},
            {new: true}
            );
            console.log(user);
;
            if(!user) {
                return res.status(404).json({message: 'User not found'})
            }
            res.json({ message: 'Thought deleted from user' })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // /api/thoughts/:thoughtId/reactions
    //POST to create a reaction stored in a single thought's reaction array field
    async addReaction (req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
            )
            console.log(thought)
            if(!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' })
            }
            res.json(thought)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)

        }
    }, 

    //DELETE to pull and remove a reaction by the reaction's reactionId value
    //pull //react
    //put body in but delete by ID
    async deleteReaction (req,res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions:{reactionId: req.params.reactionId} } },
                { runValidators: true, new: true }
            )
            if(!thought) {
                return res.status(404).json({ message: 'No such thought found with that ID'})
            }
            res.json(thought)
        } catch (error) {
            res.status(500).json(error)            
        }
    }
}