const express = require('express');
const router = express.Router();
const db = require('../models');

// GETS
// get all tags
router.get("/", function (request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }
    db.Tag.findAll({
        where: {
            UserId: request.session.user.id
        },
        attributes: ['name']
    }).then(function (result) {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// get all tags that are attached to a bookmark
router.get("/bookmark", function (request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Tag.findAll({
        where: {
            UserId: request.session.user.id
        },
        include: [{
            model: db.Bookmark,
            where: {
                id: request.query.bookmark
            },
            through: {
                attributes: [] 
            },
            attributes: []
        }],
        attributes: ['name']
    }).then(function (result) {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// POSTS
// create a new tag, attach to a bookmark
router.post("/", function (request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    // If passed a tag ID number, link specified tag to specified bookmark
    if (request.body.tag) {
        db.Tag.findOne({
            where: {
                id: request.body.tag
            }
        }).then( (checkResult) => {
            if (checkResult.hasBookmark(request.body.bookmark)) {
                response.json("Already linked.");
            } else {
                checkResult.addBookmark(request.body.bookmark);
                response.json({
                    linkSuccessful: true,
                    tag: checkResult.dataValues.id,
                    bookmark: request.body.bookmark
                });
            }
        }).catch( (err) => {
            response.status(500).json(err);
        });
    } 
    // Else, create a new tag (with specified name) and attach it to specified bookmark
    else {
        // Check if there's already a tag with that name
        db.Tag.findOne({
            where: {
                name: request.body.name
            }
        }).then( (checkResult) => {
            // If tag with specified name already exists, link it to specified bookmark
            if (checkResult) {
                if (checkResult.hasBookmark(request.body.bookmark)) {
                    response.json("Already linked.");
                } else {
                    checkResult.addBookmark(request.body.bookmark);
                    response.json({
                        linkSuccessful: true,
                        tag: checkResult.dataValues.id,
                        bookmark: request.body.bookmark
                    });
                }
            } 
            // Else, create a new tag or link
            else {
                db.Tag.create({
                    name: request.body.name,
                    UserId: request.session.user.id
                }).then(function (createResult) {
                    createResult.addBookmark(request.body.bookmark);
                    response.json({
                        linkSuccessful: true,
                        tag: createResult.dataValues.id,
                        bookmark: request.body.bookmark
                    });
                }).catch((err) => {
                    response.status(500).json(err);
                });
            }
        }).catch ( (err) => {
            response.status(500).json(err);
        });
    }

});

// PUTS
// rename a tag
router.put("/name", function (request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Tag.update({
        name: request.body.newName
    }, {
        where: {
            id: request.body.tag
        }
    }).then(function (result) {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// DELETES
// Delete a user's tag
router.delete("/:tag", function (request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Tag.destroy({
        where: {
            id: request.params.tag
        }
    }).then(function (result) {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// Remove a tag from a bookmark
router.delete("/:tag/:bookmark", function (request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Tag.findOne({
        where: {
            id: request.params.tag
        }
    }).then( (result) => {
        result.removeBookmark(request.params.bookmark);
        response.json(true);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

module.exports = router;