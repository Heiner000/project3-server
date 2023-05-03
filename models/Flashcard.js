// require mongoose ODM
const mongoose = require("mongoose")

const FlashcardSchema = new mongoose.Schema({
    front: {
        type: String
    },
    back: {
        type: String
    },
    deck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Deck"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Flashcard", FlashcardSchema)