const express = require("express");
const router = express.Router();
var path = require('path')
router
    .route("/")
    .get((req, res) => res.render(path.resolve("public/html/login.ejs")))
    .post((req, res) => res.send())

module.exports =router;