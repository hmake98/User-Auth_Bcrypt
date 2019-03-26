var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt');

/* GET singup page. */
router.get('/', function (req, res, next) {
    if (req.session.user){
        res.redirect('/home');
    }else{
        res.render('signup');
    }
});

router.post('/submit', function (req, res) {
    if (req.body.email && req.body.username && req.body.password) {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) {
                console.log(err);
            } else {
                User.findOne({
                    email: req.body.email
                }).then(user => {
                    if (user) {
                        res.render('signup', {
                            message: "User exist!"
                        });
                    } else {
                        req.body.password = hash;
                        var userData = {
                            email: req.body.email,
                            username: req.body.username,
                            password: req.body.password,
                        }
                        User.create(userData, function (err, user) {
                            if (err) {
                                console.log(err);
                                res.redirect('/signup');
                            } else {
                                req.session.user = user;
                                res.redirect('/home');
                            }
                        });
                    }
                });
            }
        });

    } else {
        console.log("Err!");
        res.redirect('/signup');
    }
});

module.exports = router;