const express = require('express');
const router = express.Router();
const db = require('../models');

const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');

router.get("/bookmark/:id", function(request, response) {

    db.Bookmark.findOne({
        where: {
            id: request.params.id
        },
        attributes: [['name', 'bookmarkName'], 'color', 'url', 'comment'],
        include: {
            model: db.Tag,
            attributes: [['id', 'tagID'], ['name', 'tagName']],
            through: { attributes: [] }
        }
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });

});


module.exports = router;