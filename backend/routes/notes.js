const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Note = require('../models/Note');

// @route   GET /api/notes
// @desc    Get all notes for a user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/notes
// @desc    Create a note
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const newNote = new Note({
            user: req.user.id,
            title,
            content
        });

        const note = await newNote.save();
        res.status(201).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/notes/:id
// @desc    Update a note
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const { title, content } = req.body;

        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Make sure user owns note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: { title, content } },
            { new: true }
        );

        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/notes/:id
// @desc    Delete a note
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Make sure user owns note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await note.deleteOne();

        res.json({ message: 'Note removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
