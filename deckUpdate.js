const mongoose = require('mongoose')
const Deck = require('./models/Deck')

require('./models')

const addImageToFlashcards = async () => {
  try {
    await Deck.updateMany(
      {},
      { $set: { 'flashcards.$[].image': null } }
    );
    console.log('All flashcards have been updated with an image field.')
    mongoose.connection.close()
  } catch (err) {
    console.error('Error updating flashcards model:', err)
  }
};

addImageToFlashcards()
