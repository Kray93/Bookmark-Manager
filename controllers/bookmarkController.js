const express = require('express');
const router = express.Router();
const db = require('../models');

// Get bookmarks by various parameters
router.get("/", function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    if (request.body.id) {
        db.Bookmark.findOne({
            where: {
                id: request.body.id
            }
        }).then( (result) => {
            response.json(result);
        }).catch( (err) => {
            response.status(500).json(err);
        });
        return;
    }

    //Querying for bookmark by other params
    const queryParams = {
        UserId: request.session.user.id
    };

    // -- by color
    if (request.body.color) {
        queryParams.color = request.body.color;
    }

    const includeParams = [];
    // -- by collection
    if (request.body.collection) {
        includeParams.push(
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
        );
    }

    // -- by tag
    if (request.body.tag) {
        includeParams.push(
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
        );
    }

    db.Bookmark.findAll({
        where: queryParams,
        include: includeParams,
        attributes: [
            'id', 'name', 'url', 'color'
        ]
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });

});

// Create a new bookmark
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
        color: request.body.color,
        UserId: request.session.user.id
    }).then( (result) => {
        if (request.body.collection) {
            db.sequelize.models.bookmark_collections.create({
                BookmarkId: result.dataValues.id,
                CollectionId: request.body.collection
            }).then( (result2) => {
                response.json([result, result2]);
            }).catch( (err) => {
                response.status(500).json(err);
            });
        }
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

// Move bookmark to a different collection
router.put("/collection", async function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    if (request.body.deleteFromOriginalCollection) {
        const delResult = await db.sequelize.models.bookmark_collections.destroy({
            where: {
                BookmarkId: request.body.id,
                CollectionId: request.body.originalCollection
            }
        });
        response.json(delResult);
    }

    db.sequelize.models.bookmark_collections.create({
        BookmarkId: request.body.id,
        CollectionId: request.body.newCollection
    }).then(function (result) {
        response.json(result);
    });
});

/*
get uncategorized bookmarks

*/

module.exports = router;