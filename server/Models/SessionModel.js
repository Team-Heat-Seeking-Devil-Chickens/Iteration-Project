const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: String, expires: 30, default: Date.now }
});

module.exports = mongoose.model('session', sessionSchema);