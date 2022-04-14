const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  purchasedCourses: {
    type: Array,
    required: true,
  },
  shoppingCart: {
    type: Array,
    required: true,
  },
  selectedCourse: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
