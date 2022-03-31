const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
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
  logged: {
    type: Boolean,
    required: true,
  },
  selectedCourse: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
