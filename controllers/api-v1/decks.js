const router = require('express').Router()
const db = require('../../models')
const authLockedRoute = require('./authLockedRoute')

// GET /decks -- get all decks for a user
router.get('/', authLockedRoute, async (req, res) => {
    res.send('Welcome to your Decks page')
})

// POST /decks -- create a new deck
router.post('/', authLockedRoute, async (req, res) => {
    res.send('New deck created')
})

// GET /decks/:id -- load a specific deck
router.get('/:id', authLockedRoute, async (req, res) => {
    res.send(`you are now looking at deck ${req.params}`)
})

// PUT /decks/:id -- update a specific deck
router.put('/:id', authLockedRoute, async (req, res) => {
    res.send(`you updated ${req.params}`)
})

// DELETE /decks/:id -- delete a specific deck
router.delete('/:id', authLockedRoute, async (req, res) => {
    res.send(`you deleted ${req.params}`)
})

// GET /decks/:id/flashcards -- load all flashcards for a deck
router.get('/:id/flashcards', authLockedRoute, async (req, res) => {
    res.send(`here is all the flashcards for deck ${req.params}`)
})

// POST /decks/:id/flashcards -- create a new flashcard
router.post('/:id/flashcards', authLockedRoute, async (req, res) => {
    res.send(`creating a new flashcard for deck ${req.params}`)
})

module.exports = router