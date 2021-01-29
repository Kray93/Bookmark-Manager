const express = require('express');
const router = express.Router();
const db = require('../models');

// Get bookmarks by collection
router.get("/", function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Bookmark.findAll({
        where: {
            UserId: request.session.user.id
        },
        include: [
            {
                model: db.Collection,
                where: {
                    id: request.body.collection
                }, 
                through: {
                    attributes: []
                },
                attributes: []
            }
        ],
        attributes: [
            'id', 'name', 'url', 'color'
        ]
    }).then((result) => {
        response.json(result)
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// Get uncategorized bookmarks
router.get("/", function (request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }


});

// Get bookmarks by tag
router.get("/", function (request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Bookmark.findAll({
        where: {
            UserId: request.session.user.id
        },
        include: [
            {
                model: db.Tag,
                where: {
                    id: request.body.tag
                },
                through: {
                    attributes: []
                },
                attributes: []
            }
        ],
        attributes: [
            'id', 'name', 'url', 'color'
        ]
    }).then((result) => {
        response.json(result)
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// Get bookmarks by color
router.get("/", function (request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Bookmark.findAll({
        where: {
            UserId: request.session.user.id,
            color: request.body.color
        }
    }).then((result) => {
        response.json(result)
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// Get single bookmark
router.get("/", function (request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Bookmark.findAll({
        where: {
            UserId: request.session.user.id,
            id: request.body.id
        }
    }).then((result) => {
        response.json(result)
    }).catch((err) => {
        response.status(500).json(err);
    });
});

router.post("/", function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Bookmark.create({
        name: request.body.name,
        url: request.body.url,
        comment: request.body.comment,
        color: request.body.color
    }).then( (result) => {
        response.json(result)
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

// Edit a bookmark's name
router.put("/name", function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Bookmark.update({
        name: request.body.newName
    }, {
        where: {
            id: request.body.id
        }
    }).then((result) => {
        if (result.affectedRows === 0) {
            // send a status 
        } else {
            response.json(result.affectedRows);
        }
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// Edit a bookmark's URL
router.put("/url", function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Bookmark.update({
        name: request.body.newURL
    }, {
        where: {
            id: request.body.id
        }
    }).then((result) => {
        if (result.affectedRows === 0) {
            // send a status 
        } else {
            response.json(result.affectedRows);
        }
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// Edit a bookmark's comment
router.put("/comment", function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Bookmark.update({
        name: request.body.comment
    }, {
        where: {
            id: request.body.id
        }
    }).then((result) => {
        if (result.affectedRows === 0) {
            // send a status 
        } else {
            response.json(result.affectedRows);
        }
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// Edit a bookmark's color
router.put("/color", function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Bookmark.update({
        name: request.body.color
    }, {
        where: {
            id: request.body.id
        }
    }).then((result) => {
        if (result.affectedRows === 0) {
            // send a status 
        } else {
            response.json(result.affectedRows);
        }
    }).catch((err) => {
        response.status(500).json(err);
    });
});


/*
get uncategorized bookmarks

*/

module.exports = router;