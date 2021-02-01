const express   = require('express');
const router    = express.Router();
const db        = require('../models');
const bcrypt    = require("bcrypt");

// Sign up route (creates a new user)
router.post("/signup", function(request, response) {
    db.User.create({
        username: request.body.username,
        password: request.body.password
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

// Log-in route (sets session user)
router.post("/login", function(request, response) {
    db.User.findOne({
        where: {
            username: request.body.username
        }
    }).then(userData => {
        if (!userData) {
            request.session.destroy();
            response.status(404).send("no such user")
        } else {
            if (bcrypt.compareSync(request.body.password, userData.password)) {
                request.session.user = {
                    id: userData.id,
                    username: userData.username
                }
                response.json(userData);
            } else {
                request.session.destroy();
                response.status(401).send("wrong password bro");
            }
        }
    });
});

// View all active sessions
router.get("/readsessions", (request, response) => {
    response.json(request.session)
});

// Log-out, end session and send to home route
router.get('/logout', (request, response) => {
    request.session.destroy();
    response.redirect('/')
});


module.exports = router;