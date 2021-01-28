const express = require("express");

const router = express.Router();

const db = require("../models/");

router.get("/api/:id", function(request, response) {
    db.Bookmark.findAll({
        where: {
            id: request.params.id
        }
    }).then(function (result) {
        
    })
})

module.exports = router;