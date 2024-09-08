const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  img: { type: String, trim: true, required: false }, // Img Cloud
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // user
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
