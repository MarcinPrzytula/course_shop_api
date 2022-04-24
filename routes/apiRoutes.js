const express = require('express');
const router = express.Router();
const passport = require('passport');

const userActions = require('../actions/userActions.js');
const courseActions = require('../actions/courseActions.js');

router.get('/courses', courseActions.getCourses);

router.get('/user', userActions.getUserData);

router.post('/register', userActions.addUser);

router.put('/user/:id', userActions.updateUser);

router.put('/course/:id', courseActions.updateCourse);

router.post(
  '/login',
  passport.authenticate('local'),
  userActions.loginUser
);

router.get('/logout', userActions.logOutUser);

module.exports = router;
