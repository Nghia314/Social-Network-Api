const { json } = require('express/lib/response');
const {Thoughts, Users} = require('../models')

const thoughtsController = {
    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getThoughtsById({params}, res) {
        Thoughts.findOne({_id: params.id})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: 'No Thoughts Found with this Id'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err =>{
            console.log(err);
            res.sendStatus(400);
        });
    },
    createThoughts({params, body}, res) {
        Thoughts.create(body)
        .then(({_id}) => {
            return Users.findOneAndUpdate({_id: params.UsersId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: 'No Thoughts Found with this Id'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => json(err));
    },

    
    updateThoughts({params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params.id}, body, {new: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: 'No Thoughts Found with this Id'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err));
    },

    deleteThoughts({params}, res) {
        Thoughts.findOneAndDelete({_id: params.id})
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: 'No Thoughts Found with this Id'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    },

    addReaction({params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: 'No Thoughts Found with this Id'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteReaction({params}, res) {
        Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: {reactionId: params.reactionId}}}, {new: true})
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: 'No Thoughts Found with this Id'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = thoughtsController;