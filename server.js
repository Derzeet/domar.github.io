const express = require("express");
var path = require("path");
const app = express();


app.set("port", process.env.PORT || 3002);

app.use(express.static(__dirname + "/public"));


app.set("public", path.join(__dirname, "public"));
app.set("view engine", "ejs");

app.use("/", require("./routes/web/root"));
app.use("/login", require("./routes/web/login"));
app.use("/profile", require("./routes/web/profile"));
app.use("/api", require("./routes/api"));

app.listen(app.get("port"),function(){
    console.log("App started on port http://localhost:" + app.get("port"));
});
