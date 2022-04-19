const express = require("express");
const router = express.Router();
var passport = require("passport");

var path = require('path');
var User = require(path.resolve("models/user.js"));
router
    .route("/")
    .get((req, res) => res.render(path.resolve("public/html/register.ejs")))
    .post((req, res, next) => {
        var username = req.body.username;
        var usersurname = req.body.surname;
        var email = req.body.email;
        var password = req.body.password;

        User.findOne({email: email}, function(err, user) {
            if (err) {return next(err);}
            if (user) {
                req.flash("error", "This email is alreqdy in use");
                return res.redirect("/register");
            }

            var newUser = new User({
                username: username,
                usersurname: usersurname,
                password: password,
                email: email
            })
            newUser.save(next);
        });
    }, passport.authenticate("login", {
        successRedirect: "/",
        failureRedirect: "/register",
        failureFlash: true
    }))

module.exports =router;