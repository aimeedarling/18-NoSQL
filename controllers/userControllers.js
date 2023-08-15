const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models')

module.exports = {

    //GET all users
    async getUsers(req, res) {
        try {
            const users = await User.find()
            const userObj = {
                users,
            };
            res.json(userObj)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    },

    //GET single user by its _id and populate thought and friend data
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v').populate('friends').populate('thoughts')
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            res.json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },
    // createUser,
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async updateUser (req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                { reunValidators: true, new: true}
            )
            if(!user) {
                return res.status(404).json({message: 'No such user exists'})
            }
            res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    // deleteUser,
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId })
            if (!user) {
                return res.status(404).json({ message: 'No such user exists' })
            }

            const deleteThoughts = await Thought.deleteMany( { user: req.params.userId } )
            await Thought.updateMany(
                {user: req.params.userId},
                { $pull: { users: req.params.userId } }
            )
            if (!deleteThoughts.deletedCount) {
                return res.status(404).json({
                    message: 'User deleted, but no thoughts found'
                })
            }
            res.json({ message: 'User and associated thought deleted!' })
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
        //GET all users
    async getUsers(req, res) {
        try {
            const users = await User.find()
            const userObj = {
                users,
            };
            res.json(userObj)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    },
    // addFriend,
    async addFriend(req, res) {
        console.log('You are adding a friend')
        console.log(req.body)
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' })
            }
            res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    // removeFriend,
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' })
            }
            res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}