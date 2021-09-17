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

const get = async (req, res) => {
    const { id } = req.params;

    if (!id)
        return res.status(403).json({
            code: 403,
            message: 'Id is required'
        });

    try {
        const note = await Note.findById(id);

        if (!note)
            return res.status(404).json({
                code: 404,
                message: "Note not found"
            });

        return res.status(200).json({
            code: 200,
            note
        });
    } catch (err) {
        return res.status(500).json({
            err,
            code: 500,
            message: "Internal server error"
        });
    }
}

const getAllByUser = async (req, res) => {
    const { id } = req.params;

    if (!id)
        return res.status(403).json({
            code: 403,
            message: 'userId is required'
        });

    try {
        const notes = await Note.find({ user: id });

        if (!notes)
            return res.status(404).json({
                code: 404,
                message: "Notes not found"
            });

        return res.status(200).json({
            code: 200,
            notes
        });
    } catch (err) {
        return res.status(500).json({
            err,
            code: 500,
            message: "Internal server error"
        });
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const errors = [];

    if (!id)
        errors.push({text: 'Id is required'});
    
    if (!title)
        errors.push({text: "Title is required"});

    if (!content)
        errors.push({text: "Content is required"});

    if (errors.length > 0)
        return res.status(403).json({
            code: 403,
            errors,
            message: "One o more field are missing"
        });
        
    try {
        const note = await Note.findById(id);

        if (!note)
            return res.status(404).json({
                code: 404,
                message: "Note not found"
            });

        note.title = title;
        note.content = content;
        note.updatedAt = Date.now();

        const noteUpdated = await note.save();

        return res.status(200).json({
            code: 200,
            note: noteUpdated
        });
    } catch (err) {
        return res.status(500).json({
            err,
            code: 500,
            message: "Internal server error"
        });
    }    
}

const remove = async (req, res) => {
    const { id } = req.params;

    if (!id)
        return res.status(403).json({
            code: 403,
            message: 'Id is required'
        });

    try {
        const note = await Note.findById(id);

        if (!note)
            return res.status(404).json({
                code: 404,
                message: "Note not found"
            });

        await note.remove();

        return res.status(200).json({
            code: 200,
            message: "Note deleted"
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
    create,
    get,
    update,
    remove,
    getAllByUser
}