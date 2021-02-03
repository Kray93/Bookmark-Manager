const express = require('express');
const router = express.Router();
const db = require('../models');

const {Op} = require('sequelize');
const {QueryTypes} = require('sequelize');

// Get bookmarks by various parameters
router.get("/", function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    if (request.query.id) {
        db.Bookmark.findOne({
            where: {
                id: request.query.id
            },
            include: [{
                model: db.Collection,
                attributes: [["name", "collectionName"], ["id", "collectionID"], ["color", "collectionColor"]],
                through: { attributes: [] }
            }, {
                model: db.Tag,
                attributes: [ ["name", "tagName"] ],
                through: { attributes: [] }
            }]
        }).then( (result) => {
            response.json(result);
        }).catch( (err) => {
            response.status(500).json(err);
        });
        return;
    }

    // Querying for bookmark by other params
    const queryParams = {
        UserId: request.session.user.id
    };

    // -- by color
    if (request.query.color) {
        queryParams.color = request.query.color;
    }

    const includeParams = [];
    // -- by collection
    if (request.query.collection) {
        includeParams.push(
            {
                model: db.Collection,
                where: {
                    id: request.query.collection
                },
                through: {
                    attributes: []
                },
                attributes: []
            }
        );
    }

    // -- by tag
    if (request.query.tag) {
        includeParams.push(
            {
                model: db.Tag,
                where: {
                    id: request.query.tag
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

// Get all uncategorized bookmarks
router.get("/uncategorized", async function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.sequelize.query(
        'SELECT `id`, `UserId`, `name`, `url`, `color` FROM bookmarks ' +
        'LEFT JOIN bookmark_collections ON bookmark_collections.BookmarkId = bookmarks.id ' + 
        'WHERE bookmark_collections.BookmarkId IS NULL', { type: QueryTypes.SELECT })
            .then( (result) => {
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
        if (request.body.collections) {
            const insertArr = request.body.collections.map(
                e => ({ BookmarkId: result.dataValues.id, CollectionId: e })
            );

            db.sequelize.models.bookmark_collections.bulkCreate(
                insertArr
            ).then( (linkResult) => {
                response.json( [result, linkResult] );
            }).catch( (err) => {
                response.status(500).json(err);
            });
        } else {
            response.json(result);
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
        if (result[0] === 0) {
            // send a status 
        } else {
            response.json(result);
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
        url: request.body.newURL
    }, {
        where: {
            id: request.body.id
        }
    }).then((result) => {
        if (result[0] === 0) {
            // send a status 
        } else {
            response.json(result);
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
        comment: request.body.newComment
    }, {
        where: {
            id: request.body.id
        }
    }).then((result) => {
        if (result[0] === 0) {
            // send a status 
        } else {
            response.json(result);
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
        color: request.body.newColor
    }, {
        where: {
            id: { [ Op.in ]: request.body.id }
        }
    }).then((result) => {
        if (result[0] === 0) {
            // send a status 
            console.log("No rows affected");
        } else {
            response.json(result);
        }
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// Update set of collections that a single bookmark (or group of bookmarks) belongs to
router.put("/collection", async function (request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    // Expecting in body:
    //      id: bookmark ID to update
    //      newCollections: array of IDs of new target collections

    const deleteResult = await db.sequelize.models.bookmark_collections.destroy({
        where: {
            BookmarkId: request.body.id
        }
    });

    const addResult = await db.sequelize.models.bookmark_collections.bulkCreate(
        request.body.newCollections.map( e => ({ BookmarkId: request.body.id, CollectionId: e}))
    );
    if (deleteResult) {
        response.json([addResult, deleteResult]);
    } else {
        response.json(addResult);
    }
});

// Delete single bookmark
router.delete("/:id", function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Bookmark.destroy({
        where: {
            id: request.params.id
        }
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

module.exports = router;