const { request, response } = require('express');
const db = require('../models');

module.exports = function (app) {

    // app.get("/api/:id", function (request, response) {
    //     db.Bookmark.findAll({
    //         where: {
    //             id: request.params.id
    //         }
    //     }).then(function (result) {
    //         response.json(result);
    //     });
    // });

    app.post("/api/seed/user", function (request, response) {
        db.User.create({
            username: request.query.username
        }).then(function(result) {
            response.json(result);
        });
    });

    

    app.post("/api/seed/collection", function(request, response) {

        db.Collection.create({
            name: request.query.name,
            UserId: request.query.user
        }).then(function (result) {
            response.json(result);
        });
    });

    app.post("/api/seed/bookmark", async function(request, response) {
        const newBookmark = await db.Bookmark.create({
            name: request.query.name,
            url: request.query.url,
            UserId: request.query.user
        });

        console.log(db.sequelize.models);

        db.sequelize.models.bookmark_collections.create({
            BookmarkId: newBookmark.dataValues.id,
            CollectionId: request.query.collection
        }).then(function(result) {
            response.json(result);
        });
    });

    app.get("/api/getBookmarksByCollection", function(request, response) {
        db.Bookmark.findAll({
            where: {
                UserId: request.query.user
            },
            include: [{
                model: db.User
            }, {
                model: db.Collection,
                where: {
                    id: request.query.collection
                },
                attributes: [
                    'name',
                    ['UserId', 'User']
                ],
                through: {
                    attributes: []
                }
            }]
        }).then(function (result) {
            response.json(result);
        });
    });

    app.get("/api/getBookmarksByTag", function (request, response) {
        db.Bookmark.findAll({
            where: {
                UserId: request.query.user
            },
            include: [
                {
                    model: db.User
                }, {
                    model: db.Tag,
                    where: {
                        id: request.query.tag
                    },
                    through: {
                        attributes: []
                    }
                }
            ],
            attributes: [
                'name',
                'url'
            ]
        }).then(function (result) {
            response.json(result);
        });
    });
}

// DRAFTING SEQUELIZE QUERIES

// GETS

// /* Get all of a user's collections8?
// db.Collection.findAll({
//     where: {
//         UserId: request.body.userId
//     }
// }).then(function (result) {
//     response.json(result);
// });

// /* Get all sub - collections from a collection */
// db.Collection.findAll({
//     where: {
//         ParentCollection: request.body.collectionId
//     }
// }).then(function (result) {
//     response.json(result);
// })

// /* get all bookmarks in a user's collection */
// db.Bookmark.findAll({
//     where: {
//         UserId: request.query.user
//     },
//     include: [{
//         model: db.User
//     }, {
//         model: db.Collection,
//         where: {
//             id: request.query.collection
//         },
//         attributes: [
//             'name',
//             ['UserId', 'User']
//         ],
//         through: {
//             attributes: []
//         }
//     }]
// }).then(function (result) {
//     response.json(result);
// });

// Get all of a user's bookmarks with a specified tag
// db.Bookmark.findAll({
//     where: {
//         UserId: request.query.user
//     },
//     include: [
//         {
//             model: db.User
//         }, {
//             model: db.Tag,
//             where: {
//                 id: request.query.tag
//             },
//             through: {
//                 attributes: []
//             }
//         }
//     ], 
//     attributes: [
//         'name',
//         'url'
//     ]
// }).then(function (result) {
//     response.json(result);
// });


// get all of a bookmark's tags

// get all collections that a bookmark belongs to < --- ????

//     POSTS

// Add new user

// Add a new collection to a user

// Add a new collection to a collection

// Add a new bookmark to a collection

// Add a new tag to a bookmark

// PUTS

// Edit username / password

// Edit collection name

// Edit parent collection(moving subcollection to new parent)

// Edit bookmark name

// Edit bookmark url

// Edit bookmark comment

// Move bookmark to different collection

// DELETES

// Remove user

// Remove collection

// Remove bookmark

// Remove tag from bookmark

// Remove tag

// Remove bookmark from single collection(only if bookmark belongs to more than 1 collection)

