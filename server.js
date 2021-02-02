
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 8080;

const db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*2 // 2 hours
    }
}))

app.use(express.static(__dirname + "/public"));
app.use("/assets/d3", express.static(__dirname + "/node_modules/d3/dist"));
app.use("/assets/materialize", express.static(__dirname + "/node_modules/materialize-css/dist"));
app.use("/assets/jquery", express.static(__dirname + "/node_modules/jquery/dist"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Controllers
const userController = require('./controllers/userController');
app.use(userController);

const collectionController = require('./controllers/collectionController');
app.use('/api/collections', collectionController);

const bookmarkController = require('./controllers/bookmarkController');
app.use('/api/bookmarks', bookmarkController);

const tagController = require('./controllers/tagController');
app.use('/api/tags', tagController);

app.use(require('./controllers/listRenderer'));
app.use(require('./controllers/modalRenderer'));

require('./routes/api-routes')(app);

db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});