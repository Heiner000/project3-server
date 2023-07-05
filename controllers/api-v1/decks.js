const router = require('express').Router()
const db = require('../../models')
const authLockedRoute = require('./authLockedRoute')
// multipart form data packages
const multer = require('multer')
// cloudinary npm package to ma nage uploads
const cloudinary = require('cloudinary').v2
// utility for deleteing files
const { unlinkSync } = require('fs')

// config for multer
const uploads = multer({ dest: 'uploads' })

// GET /decks -- get all decks for a user
router.get('/', authLockedRoute, async (req, res) => {
    try {
        const decks = await db.User.findById(res.locals.user._id).populate('decks')
        res.json(decks.decks)
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'server error getting decks' })
    }
})

// POST /decks -- create a new deck
router.post('/', authLockedRoute, async (req, res) => {
    try {
        const newDeck = new db.Deck({
            title: req.body.title,
            user: res.locals.user._id
        })
        const savedDeck = await newDeck.save()

        const user = await db.User.findById(res.locals.user._id)
        user.decks.push(savedDeck._id)
        await user.save()

        res.json(savedDeck)
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'server error creating deck' })
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
        res.status(500).json({ msg: 'server error loading specific deck' })
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
        res.status(500).json({ msg: 'server error updating deck' })
    }
})

// DELETE /decks/:id -- delete a specific deck
router.delete('/:id', authLockedRoute, async (req, res) => {
    try {
        const { id } = req.params
        const deletedDeck = await db.Deck.findByIdAndDelete(id)

        const user = await db.User.findById(res.locals.user._id)
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
router.post('/:id/flashcards', authLockedRoute, uploads.single('image'), async (req, res) => {
    console.log('req.body:', req.body)
    console.log('req.file:', req.file)
    try {
        const { id } = req.params
        const deck = await db.Deck.findById(id)
        // console.log(req.file)

        let newFlashcard = {
            front: req.body.front,
            back: req.body.back,
            image: "brain_training_em0esm"
        }

        // if there's an image, upload to cloudinary
        if (req.file && req.file.path) {
            const cloudData = await cloudinary.uploader.upload(req.file.path)
            newFlashcard.image = cloudData.public_id

            // delete the file so it doesn't clutter up the server folder
            unlinkSync(req.file.path)
        }

        deck.flashcards.push(newFlashcard)
        await deck.save()

        res.json(newFlashcard)
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: 'server error creating new flashcard' })
    }
})

module.exports = router