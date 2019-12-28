const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// plugin() is a mongoose function.
// Here, we do an audit:
// we don't want two users with the same email.
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
