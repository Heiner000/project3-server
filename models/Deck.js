// require mongoose ODM
const mongoose = require("mongoose")

const FlashcardSchema = new mongoose.Schema({
    front: {
        type: String
    },
    back: {
        type: String
    },
    image: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

const DeckSchema = new mongoose.Schema({
    title: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    flashcards: [FlashcardSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model("Deck", DeckSchema)