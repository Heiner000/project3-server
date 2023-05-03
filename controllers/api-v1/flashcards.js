const router = require('express').Router()
const db = require('../../models')
const authLockedRoute = require('./authLockedRoute')

// GET /flashcards/:id -- get a specific flashcard
router.get('/id', authLockedRoute, async (req, res) => {
    res.send(`Here is flashcard ${req.params}`)
})

// PUT /flashcards/:id -- update a specific flashcard
router.post('/:id', authLockedRoute, async (req, res) => {
    res.send('New flashcard created')
})

// DELETE /flashcards/:id -- delete a specific flashcard
router.delete('/:id', authLockedRoute, async (req, res) => {
    res.send(`you deleted ${req.params}`)
})



module.exports = router