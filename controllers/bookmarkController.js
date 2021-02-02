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
            }
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
        if (request.body.collection) {
            result.addCollection(request.body.collection);
            response.json({
                linkedToCollection: true,
                bookmark: result.dataValues.id,
                collection: request.body.collection
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
        name: request.body.newComment
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
        color: request.body.newColor
    }, {
        where: {
            id: { [ Op.in ]: request.body.id }
        }
    }).then((result) => {
        if (result.affectedRows === 0) {
            // send a status 
            console.log("No rows affected");
        } else {
            response.json(result);
        }
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// Move bookmark(s) to a different collection
router.put("/collection", function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    if (request.body.id) {
        if (request.body.deleteFromOriginalCollection) {
            if (!request.body.originalCollection) {
                response.status(301).json("In order to delete from original collection the original collection ID must be provided.");
                // ^CLARIFY STATUS CODE
            }
        }

        db.Bookmark.findOne({
            where: {
                id: request.body.id
            }
        }).then( async (result) => {
            if (request.body.deleteFromOriginalCollection) {
                if (result.hasCollection(request.body.originalCollection)) {
                    result.removeCollection(request.body.originalCollection);
                }
            }

            if (await result.hasCollection(request.body.newCollection)) {
                response.json("Already linked.")
            } else {
                await result.addCollection(request.body.newCollection);
                response.json({
                    linkedBookmarkToCollection: true,
                    bookmark: result.dataValues.id,
                    collection: request.body.newCollection
                });
            }
        });
    } else {
        const newCollection = request.body.newCollection;

        db.Bookmark.findAll({
            include: [
                {
                    model: db.Collection,
                    where: {
                        id: request.body.originalCollection
                    }
                }
            ]
        }).then( (result) => {

            db.sequelize.models.bookmark_collections.bulkCreate(
                result.map( r => ({ BookmarkId: r.id, CollectionId: newCollection }) )
            ).then( (result2) => {
                const queryParams = {
                    CollectionId: request.body.originalCollection
                };

                // If passed a bookmark ID, then only apply update to single bookmark
                if (request.body.id) {
                    queryParams.BookmarkId = request.body.id;
                }

                if (request.body.deleteFromOriginalCollection) {
                    result.removeCollection([])
                    db.sequelize.models.bookmark_collections.destroy({
                        where: queryParams
                    }).then ( (deleteResult) => {
                        response.json( [result, result2, deleteResult] );
                    }).catch( (err) => {
                        response.status(500).json(err);
                        return;
                    });
                } else {
                    response.json( [result, result2] );
                }

            }).catch( (err) => {
                response.status(500).json(err);
                return;
            });
        }).catch( (err) => {
            response.status(500).json(err);
            return;
        });
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