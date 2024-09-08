const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, trim: true, required: false }, // Img cloud
});

const User = mongoose.model('User', userSchema);
module.exports = User;
