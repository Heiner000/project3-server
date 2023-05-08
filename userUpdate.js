const mongoose = require('mongoose')
const User = require('./models/User')

require('./models')

const addScoreToUsers = async () => {
  try {
    await User.updateMany({}, { $set: { score: 0 } })
    console.log('All users have been updated with a score field.')
    mongoose.connection.close()
  } catch (err) {
    console.error('Error updating users:', err)
  }
}

addScoreToUsers()
