const router = require('express').Router()
const db = require('../../models')
const authLockedRoute = require('./authLockedRoute')

// GET /flashcards/:id -- get a specific flashcard
router.get('/:id', authLockedRoute, async (req, res) => {
    try {
        const { id } = req.params
        const deck = await db.Deck.findOne({ 'flashcards._id': id })

        if (deck) {
            const flashcard = deck.flashcards.id(id)
            res.json(flashcard)
        } else {
            res.status(404).json({ msg: 'flashcard not found' })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'server problem getting flashcard' })
    }
})

// PUT /flashcards/:id -- update a specific flashcard
router.put('/:id', authLockedRoute, async (req, res) => {
    try {
        const { id } = req.params
        const deck = await db.Deck.findOne({ 'flashcards._id': id })

        if (deck) {
            const flashcard = deck.flashcards.id(id)
            flashcard.set(req.body)
            await deck.save()
            res.json(flashcard)
        } else {
            res.status(404).json({ msg: 'flashcard not found' })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'server problem updating flashcard' })
    }
})

// DELETE /flashcards/:id -- delete a specific flashcard
router.delete('/:id', authLockedRoute, async (req, res) => {
    try {
        const { id } = req.params
        const deck = await db.Deck.findOne({ 'flashcards._id': id })

        if (deck) {
            const flashcard = deck.flashcards.id(id)
            flashcard.remove()
            await deck.save()
            res.json({ msg: 'flashcard delete successful' })
        } else {
            res.status(404).json({ msg: 'flashcard not found' })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'server problem deleting flashcard'})
    }
})

module.exports = router