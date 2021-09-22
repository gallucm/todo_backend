const Note = require('../models/note.js');


const create = async (req, res) => {
    const { title, content, user} = req.body;

    const errors = [];

    if (!user)
        errors.push({text: 'User is required'});

    if (!title)
        errors.push({text: "Title is required"});

    if (!content)
        errors.push({text: "Content is required"});
    
    if (errors.length > 0)
        return res.status(400).json({
            code: 400,
            errors
        });

    if (user != req.user.id){
        return res.status(403).json({
            code: 403,
            message: "You can't create a note for another user"
        });
    }

    try{
        const newNote = new Note({ title, content, user });
        const noteSaved = await newNote.save();
        return res.status(200).json({
            code: 200,
            note: noteSaved
        });
    } catch (err) {
        return res.status(500).json({
            code: 500,
            err
        });
    }
}

const get = async (req, res) => {
    const { id } = req.params;

    if (!id)
        return res.status(400).json({
            code: 400,
            message: 'Id is required'
        });

    try {
        const note = await Note.findById(id);

        if (!note)
            return res.status(404).json({
                code: 404,
                message: "Note not found"
            });

        if (note.user != req.user._id)
            return res.status(403).json({
                code: 403,
                message: "You can't get a note from another user"
            });

        return res.status(200).json({
            code: 200,
            note
        });
    } catch (err) {
        return res.status(500).json({
            code: 500,
            err
        });
    }
}

const getAllByUser = async (req, res) => {
    const { id } = req.params;

    if (!id)
        return res.status(400).json({
            code: 400,
            message: 'userId is required'
        });

    try {
        const notes = await Note.find({ user: id });

        if (!notes)
            return res.status(404).json({
                code: 404,
                message: "Notes not found"
            });

        if (notes[0].user != req.user.id) 
            return res.status(403).json({
                code: 403,
                message: "You can't get notes from another user"
            });

        return res.status(200).json({
            code: 200,
            notes
        });
    } catch (err) {
        return res.status(500).json({
            code: 500,
            err
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
        return res.status(400).json({
            code: 400,
            errors
        });
        
    try {
        const note = await Note.findById(id);

        if (!note)
            return res.status(404).json({
                code: 404,
                message: "Note not found"
            });

        if (note.user != req.user.id) 
            return res.status(403).json({
                code: 403,
                message: "You can't update a note from another user"
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
            code: 500,
            err
        });
    }    
}

const remove = async (req, res) => {
    const { id } = req.params;

    if (!id)
        return res.status(400).json({
            code: 400,
            message: 'Id is required'
        });

    try {
        const note = await Note.findById(id);

        if (!note)
            return res.status(404).json({
                code: 404,
                message: "Note not found"
            });

        if (note.user != req.user.id)
            return res.status(403).json({
                code: 403,
                message: "You can't delete a note from another user"
            });

        await note.remove();

        return res.status(200).json({
            code: 200,
            message: "Note deleted"
        });
    } catch (err) {
        return res.status(500).json({
            code: 500,
            err
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