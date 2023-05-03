// require mongoose ODM
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
	decks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Deck"
		}
	]
}, {
	timestamps: true
})

module.exports = mongoose.model('User', UserSchema)