const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  email: String,
  title: String,
  location: String,
  timedate: Date,
  details: String
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking
