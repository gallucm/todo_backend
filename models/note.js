const mongoose = require('mongoose');
const { getDate } = require('../helpers/date');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: getDate()
    },
    updatedAt: {
        type: Date,
        default: null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    __v: { type: Number, select: false}
});


module.exports = mongoose.model("Note", noteSchema);