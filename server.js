
const express = require("express");
var path = require("path");
var bodyparser = require("body-parser");
let https = require("https")

// var mongoose = require("mongoose");
// var cookieParser = require("cookie-parser");
// var passport = require("passport");
// var session = require("express-session");
// var flash = require("connect-flash");
// var params = require("./parametres/param");
//
// const url = params.dataBaseUrl;
//
//
// var setUpPassword = require("./setuppassport");

const app = express();
// mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser:true, yseCreateIndex:true});
// setUpPassword();
app.use(bodyparser.urlencoded({extended: false}));
// app.use(cookieParser());
// app.use(session({
//     secret: "sadsdhsdhhsd232-",
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());


app.set("port", process.env.PORT || 3003);

app.use(express.static(__dirname + "/public"));


app.set("public", path.join(__dirname, "public"));
app.set("view engine", "ejs");

app.use("/", require("./routes/web/root"));
app.use("/login", require("./routes/web/login"));
app.use("/register", require("./routes/web/register"));
app.use("/profile", require("./routes/web/profile"));

app.listen(app.get("port"),function(){
    console.log("App started on port http://localhost:" + app.get("port"));
});





