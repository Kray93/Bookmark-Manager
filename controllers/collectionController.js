const express = require('express');
const router = express.Router();
const db = require('../models');

const { Op } = require('sequelize');

// Get all collections that ARE NOT a sub-collection
router.get("/", function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }
// id is the collection id, should be using UserId. this route is broken
    db.Collection.findAll({
        where: {
            id: request.session.user.id,
            ParentCollection: { [ Op.is ]: null }
        }
    }).then (function (result) {
        response.json(result);
    }).catch ( (err) => {
        response.status(500).json(err);
    });
});

// Get a collection by id
router.get("/id", function(request, response) {
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    db.Collection.findOne({
        where: {
            id: request.query.id
        }
    }).then(function(result) {
        response.json(result);
    }).catch(err => response.status(500).json(err));
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
            ParentCollection: request.query.parent
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
        name: request.body.name,
        color: request.body.color, // NULL if no color attached
        UserId: request.session.user.id, 
        ParentCollection: request.body.ParentCollection // NULL if not a sub-collection
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
        name: request.body.newName
    }, {
        where: {
            id: request.body.id
        }
    }).then( (result) => {
        response.json(result);
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
        ParentCollection: request.body.newParentCollection
    }, {
        where: {
            id: request.body.id
        }
    }).then( (result) => {
        response.json(result);
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
        color: request.body.newColor
    }, {
        where: {
            id: { [ Op.in ]: request.body.ids}
        }
    }).then( (result) => {
        response.json(result);
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