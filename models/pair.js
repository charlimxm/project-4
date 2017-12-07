const mongoose = require("mongoose")
const Schema = mongoose.Schema

const pairSchema = new mongoose.Schema({
  pair: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

const Pair = mongoose.model("Pair", pairSchema)

module.exports = Pair
