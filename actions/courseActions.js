const Course = require('../db/models/courses');

module.exports = {
  async getCourses(req, res) {
    let doc;
    try {
      doc = await Course.find();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    // res.render('Work');
    res.status(200).json(doc);
  },

  async updateCourse(req, res) {
    const { _id, rating } = req.body;
    let updateCourse = await Course.findOne({ _id });

    updateCourse.rating = rating;

    updateCourse.save();

    res.status(201).json(updateCourse);
  },
};
