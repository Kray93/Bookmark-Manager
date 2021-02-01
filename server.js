require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

// const db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));
app.use(
    "/assets/materialize",
    express.static(__dirname + "/node_modules/materialize-css/dist")
);
app.use(
    "/assets/jquery",
    express.static(__dirname + "/node_modules/jquery/dist")
);

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function (req, res) {
    res.render("index", { name: "my bookmarks", collections: [{ name: "work", id: 1, color: "red", collections: [{ name: "css", color: "salmon", bookmarks: [{ name: "W3 Schools CSS", id: 1, url: "https://www.w3schools.com/css/default.asp" }] }], bookmarks: [{ name: "BCS", color: "green", id: 2, url: "bootcampspot.com" }] }], bookmarks: [] });
});

// db.sequelize.sync({ force: true }).then(function() {
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
// });
