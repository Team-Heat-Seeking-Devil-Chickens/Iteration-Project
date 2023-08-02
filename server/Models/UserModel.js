const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  zipcode: { type: String, required: true },
});

const reviewSchema = new Schema({
  restaurantID: { type: String, required: true, unique: true },
  reviews: { type: [Object], required: true, unique: true },
  total: { type: Number, default: 0 },
  count: { type: Number, default: 0 }
})

const User = mongoose.model('user', userSchema);
const Review = mongoose.model('review', reviewSchema)

module.exports = { User, Review };