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
            id: request.body.id
        }
    }).then(function (result) {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// get all tags that are attached to a bookmark
router.get("/", function (request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }
    db.Tag.findAll({
        where: {
            id: request.body.id,
        },
        include: [{
            model: db.Bookmark,
            through: { attributes: [] },
            attributes: ["color", "name", "url"]
        }],
        attributes: []
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
    db.Tag.create({
        name: request.query.name,
        BookmarkId: request.query.bookmark,
        UserId: request.query.user
    }).then(function (result) {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// add an existing tag to an existing bookmark
router.post("/", function (request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }
    db.Tag.create({
        BookmarkId: request.query.bookmark,
        TagId: request.query.tag
    }).then(function (result) {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// PUTS
// rename a tag
router.put("/", function (request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }
    db.Tag.update({
        name: request.query.newName
    }).then(function (result) {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});
// DELETES
// Delete a user's tag
router.delete("/", function (request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }
    db.Tag.destroy({
        where: {
            id: request.params.id
        }
    }).then(function (result) {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// Delete a tag from a bookmark
router.delete("/", function (request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }
    db.Tag.destroy({
        where: {
            id: request.body.id,
        },
        include: [{
            model: db.Bookmark,
            through: { attributes: [] },
            attributes: ["color", "name", "url"]
        }],
        attributes: []
    }).then(function (result) {
        response.json(result);
    }).catch((err) => {
        response.status(500).json(err);
    });
});