const User = require('../db/models/user');

module.exports = {
  async getAllUsers(req, res) {
    let doc;
    try {
      doc = await User.find({});
    } catch (err) {
      return res
        .status(500)
        .json({ message: err.message });
    }

    res.status(200).json(doc);
  },

  async getUser(req, res) {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });

    res.status(200).json(user);
  },

  async addUser(req, res) {
    let newUser;
    try {
      newUser = new User(req.body);
      await newUser.save();
    } catch (err) {
      return res
        .status(422)
        .json({ message: err.message });
    }
    res.status(201).json(newUser);
  },

  async updateUser(req, res) {
    const {
      id,
      logged,
      purchasedCourses,
      shoppingCart,
    } = req.body;

    let updateUser = await User.findOne({ id });

    updateUser.logged = logged;
    updateUser.purchasedCourses =
      purchasedCourses;
    updateUser.shoppingCart = shoppingCart;

    updateUser.save();

    res.status(201).json(updateUser);
  },
};
