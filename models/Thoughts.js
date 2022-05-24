const { Schema, model, Types } = require('mongoose');
const time = require('moment');

const ReactionsSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        require: true,
        maxLength: 200
    },
    username: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createAtVal) => time(createAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
},
{
    toJSON: {
        virtual: true,
        getters: true,
    },
    id: false
});

const ThoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createAtVal) => time(createAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        require: true,
    },
    reaction: [ReactionsSchema]
},
{
    toJSON: {
        virtual: true,
        getters: true,
    },
    id: false
});

ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;