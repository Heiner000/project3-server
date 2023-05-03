const router = require('express').Router()
const db = require('../../models')
const authLockedRoute = require('./authLockedRoute')

// GET /flashcards -- get all flashcards for a user
router.get('/', authLockedRoute, async (req, res) => {
    res.send('Welcome to your flashcards page')
})

// POST /flashcards -- create a new flashcard
router.post('/', authLockedRoute, async (req, res) => {
    res.send('New flashcard created')
})

// GET /flashcards/:id -- load a specific flashcard
router.get('/:id', authLockedRoute, async (req, res) => {
    res.send(`you are now looking at flashcard ${req.params}`)
})

// PUT /flashcards/:id -- update a specific flashcard
router.put('/:id', authLockedRoute, async (req, res) => {
    res.send(`you updated ${req.params}`)
})

// DELETE /flashcards/:id -- delete a specific flashcard
router.delete('/:id', authLockedRoute, async (req, res) => {
    res.send(`you deleted ${req.params}`)
})

module.exports = router