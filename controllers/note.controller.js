const validator = require('validator');
const Note = require('../models/note.js');

const create = async (req, res) => {
    const { title, content, user} = req.body;

    try {
        var validTitle = !validator.isEmpty(title);
        var validContent = !validator.isEmpty(content);
        var validUser = !validator.isEmpty(user);

    } catch (err) {
        return res.status(403).json({
            code: 403,
            message: "One o more field are missing"
        });
    }

    const errors = [];

    if (!validUser)
        errors.push({text: 'User is required'});

    if (!validTitle)
        errors.push({text: "Title is required"});

    if (!validContent)
        errors.push({text: "Content is required"});
    
    if (errors.length > 0)
        return res.status(403).json({
            code: 403,
            errors,
            message: "One o more field are wrong"
        });

    try{
        const newNote = new Note({ title, content, user });
        const noteSaved = await newNote.save();
        return res.status(200).json({
            code: 200,
            note: noteSaved
        });
    } catch (err) {
        return res.status(500).json({
            err,
            code: 500,
            message: "Internal server error"
        });
    }
}

module.exports = {
    create
}