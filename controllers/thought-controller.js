const { User, Thought } = require('../models/');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req,res){
        Thought.find({})
        .select('-__v')
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .sort({_id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //get a single thought
    getThoughtById({params},res){
        Thought.findOne({ _id: params.id})
        .select('-__v')
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //create a thought
    createThought({body},res){
        Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err));
    },
    //update a thought
    updateThought(){},
    //delete a thought
    deleteThought(){},
    // postReaction(){},
    // deleteReaction(){}
}

module.exports = thoughtController;