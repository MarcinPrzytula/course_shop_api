const User = require('../db/models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { update } = require('../db/models/user');

module.exports = {
  addUser(req, res) {
    User.findOne(
      { login: req.body.username },
      async (err, doc) => {
        if (err) throw err;
        if (doc) res.send('User Already Exsists');
        if (!doc) {
          const hashedPassword = await bcrypt.hash(
            req.body.password,
            10
          );
          const newUser = new User({
            login: req.body.username,
            password: hashedPassword,
            purchasedCourses: [],
            shoppingCart: [],
            logged: false,
            selectedCourse: ' ',
          });
          await newUser.save();
          res.send('User Created');
        }
      }
    );
  },

  async updateUser(req, res) {
    const {
      _id,
      purchasedCourses,
      shoppingCart,
      selectedCourse,
    } = req.body;
    let updateUser = await User.findOne({ _id });

    updateUser.purchasedCourses = purchasedCourses;
    updateUser.shoppingCart = shoppingCart;
    updateUser.selectedCourse = selectedCourse;

    updateUser.save();

    res.status(201).json(updateUser);
  },

  loginUser(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) throw err;
      if (!user) res.send('No User Exsist');
      else {
        req.logIn(user, err => {
          if (err) throw err;
          res.send(req.user);
        });
      }
    })(req, res, next);
  },

  getUserData(req, res) {
    console.log(req.user);
    console.log(req.passport);
    res.send(req.user);
  },

  logOutUser(req, res) {
    req.logOut(); // <-- not req.logout();
    res.end();
  },
};
