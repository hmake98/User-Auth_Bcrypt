var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/login', function (req, res) {
  if (req.body.email && req.body.password) {
    User.find({
      email: req.body.email
    }, (err, user) => {
      if (err) {
        console.log(err);
      } else if(user.length == 0) {
        res.render('index', { message: "No account found!"});
      } else {
        user.forEach(element => {
          bcrypt.compare(req.body.password, element.password, (err, isMatch) => {
            if(err){
              return err;
            }else{
              if(isMatch){
                req.session.user = user;
                res.redirect('/home');
              }else{ 
                res.render('index', { message: "Password Invalid!"});
              }
            }
          });
        });
      }
    });
  }
});

module.exports = router;