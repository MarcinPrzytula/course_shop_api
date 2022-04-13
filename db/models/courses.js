const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  authors: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Array,
    required: true,
  },
});

const Course = mongoose.model('courses', CourseSchema);

module.exports = Course;
