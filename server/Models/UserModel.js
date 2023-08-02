const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const MONGO_URI =  'mongodb+srv://clhilgert:xdxblRkWtfc2ySyq@cluster0.ecdzfa9.mongodb.net/?retryWrites=true&w=majority'

// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    zipcode: {type:String, required: true},
  });

const reviewSchema = new Schema({
  restaurantID: {type: String, required: true, unique: true},
  reviews: {type: [Object], required: true, unique: true},
})

//{userID: , reviewText: ""}


const User = mongoose.model('user', userSchema);
const Review = mongoose.model('review', reviewSchema)

module.exports = {User, Review};