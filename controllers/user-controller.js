const { User, Thought } = require('../models/');

const userController = {
    //get all users
    getAllUsers(req,res){
        User.find({})
        .select('-__v')
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .sort({ username: 1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //get user by id
    getUserById({params}, res){
        User.findOne({ _id: params.id})
        .select('-__v')
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .then(dbUserData => {
            //check if there is user data
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //create a user
    createUser({ body },res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    //update a user
    updateUser({params, body}, res){
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    //delete a user
    deleteUser({params}, res){
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    //add friend to friends list
    addFriend({params},res){
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: {friends: params.friendId} },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    //delete friend
    deleteFriend({params}, res){
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: {friends: params.friendId} }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = userController;