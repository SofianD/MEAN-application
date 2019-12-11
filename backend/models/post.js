const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {  type: String, required: true },
  content: { type: String, required: true }
});

// IMPORTANT !!
// |  |  |  |
// V  V  V  V
module.exports = mongoose.model('Post', postSchema);
