const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require("bcrypt");

router.post("/signup", function(request, response) {
    db.User.create({
        username: request.body.username,
        password: request.body.password
    }).then( (result) => {
        res.json(result);
    }).catch( (err) => {
        res.status(500).json(err);
    })
});

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
                response.status(401).send("wrong password bro")
            }
        }
    });
});

router.get("/readsessions", (request, response) => {
    response.json(request.session)
});

router.get("/secretclub", (request, response) => {
    if (request.session.user) {
        response.send(`welcome to the club, ${request.session.user.username}!`)
    } else {
        response.status(401).send("login first you knucklehead")
    }
});

router.get('/logout', (request, response) => {
    request.session.destroy();
    response.redirect('/')
});


module.exports = router;