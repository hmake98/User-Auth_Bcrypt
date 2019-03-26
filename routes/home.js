var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */

function checkSigninUser(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.render('index', {
      message: "User not logged in!"
    });;
  }
}

router.get('/', checkSigninUser, function (req, res, next) {
  User.find({}).then(users => {
    res.render('home');
  }).catch(err => {
    res.json({
      success: false,
      message: "No user found!",
      error: err
    });
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;