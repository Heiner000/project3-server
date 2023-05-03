const router = require('express').Router()
const db = require('../../models')
const authLockedRoute = require('./authLockedRoute')

// GET /decks -- get all decks for a user
router.get('/', authLockedRoute, async (req, res) => {
    try {
        const decks = await db.User.findById(req.user._id).populate('decks')
        res.json(decks.decks)
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'server error getting decks'})
    }
})

// POST /decks -- create a new deck
router.post('/', authLockedRoute, async (req, res) => {
    try {
        const newDeck = new db.Deck({
            title: req.body.title,
            user: req.user._id
        })
        const savedDeck = await newDeck.save()

        const user = await db.User.findById(req.user._id)
        user.decks.push(savedDeck._id)
        await user.save()

        res.json(savedDeck)
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'server error creating deck'})
    }
})

// GET /decks/:id -- load a specific deck
router.get('/:id', authLockedRoute, async (req, res) => {
    try {
        const { id } = req.params
        const deck = await db.Deck.findById(id)
        res.json(deck)
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'server error loading specific deck'})
    }
})

// PUT /decks/:id -- update a specific deck
router.put('/:id', authLockedRoute, async (req, res) => {
    try {
        const { id } = req.params
        const updatedDeck = await db.Deck.findByIdAndUpdate(id, req.body, { new: true })

        res.json({ result: updatedDeck })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'server error updating deck'})
    }
})

// DELETE /decks/:id -- delete a specific deck
router.delete('/:id', authLockedRoute, async (req, res) => {
    try {
        const { id } = req.params
        const deletedDeck = await db.Deck.findByIdAndDelete(id)

        const user = await db.User.findById(req.user._id)
        user.decks.pull(deletedDeck._id)
        await user.save()

        res.json({ msg: 'Deck deleted', deletedDeck })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'server error deleting deck' })
    }
})

// GET /decks/:id/flashcards -- load all flashcards for a deck
router.get('/:id/flashcards', authLockedRoute, async (req, res) => {
    try {
        const { id } = req.params
        const deck = await db.Deck.findById(id)

        res.json(deck.flashcards)
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'server error getting deck flashcards' })
    }
})

// POST /decks/:id/flashcards -- create a new flashcard
router.post('/:id/flashcards', authLockedRoute, async (req, res) => {
    try {
        const { id } = req.params
        const deck = await db.Deck.findById(id)
         
        const newFlashcard = {
            front: req.body.front,
            back: req.body.back
        }

        deck.flashcards.push(newFlashcard)
        await deck.save()

        res.json(newFlashcard)
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'server error creating new flashcard'})
    }
    res.send(`creating a new flashcard for deck ${req.params}`)
})

module.exports = router