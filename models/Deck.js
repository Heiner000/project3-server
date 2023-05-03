// require mongoose ODM
const mongoose = require("mongoose")

const DeckSchema = new mongoose.Schema({
    title: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    flashcards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Flashcard"
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model("Deck", DeckSchema)