const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all collections for the current user
router.get("/", function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Collection.findAll({
        where: {
            id: request.session.user.id // don't have express-session installed yet
        }
    }).then (function (result) {
        response.json(result);
    }).catch ( (err) => {
        response.status(500).json(err);
    });
});

// Get all sub-collections in a selected collection
router.get("/subcollections", function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Collection.findAll({
        where: {
            ParentCollection: request.body.collectionId
        }
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });

});

// Create a new collection
router.post("/", function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }
    
    db.Collection.create({
        name: request.query.name,
        color: request.query.color, // NULL if no color attached
        UserId: request.session.user.id, // don't have express-session installed yet,
        ParentCollection: request.query.parent // NULL if not a sub-collection
    }).then( (result) => {
        response.json(result);
    }).catch( (err) => {
        response.status(500).json(err);
    });
    
});

// Rename a collection
router.put("/name", function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Collection.update({
        name: request.query.newName
    }, {
        where: {
            id: request.query.collection
        }
    }).then( (result) => {
        response.json(result.affectedRows);
    }).catch( (err) => {
        response.status(500).json(err);
    });
});

// Move collection to a new parent
router.put("/parent", function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Collection.update({
        ParentCollection: request.query.newParentCollection
    }, {
        where: {
            id: request.query.collection
        }
    }).then( (result) => {
        response.json(result.affectedRows);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// Change a collection's color
router.put("/color", function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Collection.update({
        color: request.query.newColor
    }, {
        where: {
            id: request.query.collection
        }
    }).then( (result) => {
        response.json(result.affectedRows);
    }).catch((err) => {
        response.status(500).json(err);
    });
});

// Delete a collection
router.delete("/:id", function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Collection.destroy({
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