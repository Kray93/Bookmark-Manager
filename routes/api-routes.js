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


    // Test; directly insert a collection
    app.post("/api/seed/collection", function(request, response) {

        db.Collection.create({
            name: request.query.name,
            UserId: request.query.user
        }).then(function (result) {
            response.json(result);
        });
    });

    // Test; directly insert a bookmark
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

    // Test; directly pull bookmarks in a collection
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

// /* Get all bookmarks in a user's collection */
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


// Get all of a bookmark's tags
// db.Tag.findAll({
//     where: {
//         UserId: request.query.user
//     }, 
//     include: [
//         {
//             model: db.User
//         }, {
//             model: db.Bookmark,
//             where: {
//                 id: request.query.bookmark
//             },
//             attributes: [
//                 'name'
//             ],
//             through: {
//                 attributes: []
//             }
//         }
//     ]
// }).then(function(result) {
//     response.json(result);
// })

// get all collections that a bookmark belongs to < --- ????

//     POSTS

// // Add new user
// db.User.create({
//     username: request.query.username
// }).then(function (result) {
//     response.json(result);
// })

// // Add a new collection to a user
// db.Collection.create({
//     name: request.query.name,
//     UserId: request.query.user,
//     ParentCollection: request.query.parent // NULL if not a sub-collection
// }).then(function (result) {
//     response.json(result);
// })

// // Add a new collection to a collection
// // SEE ABOVE

// // Add a new bookmark to a collection
// const newBookmark = await db.Bookmark.create({
//     name: request.query.name,
//     url: request.query.url,
//     UserId: request.query.user
// });

// db.sequelize.models.bookmark_collections.create({
//     BookmarkId: newBookmark.dataValues.id,
//     CollectionId: request.query.collection
// }).then(function (result) {
//     response.json(result);
// });

// // Add an existing bookmark to a collection
// db.sequelize.models.bookmark_collections.create({
//     BookmarkId: newBookmark.dataValues.id,
//     CollectionId: request.query.collection
// }).then(function (result) {
//     response.json(result);
// });

// // Add a new tag to an existing bookmark
// const newTag = await db.Tag.create({
//     name: request.query.name,
//     UserId: request.query.user
// });

// db.sequelize.models.bookmark_tags.create({
//     BookmarkId: request.query.bookmark,
//     TagId: newTag.dataValues.id
// }).then(function(result) {
//     response.json(result);
// });

// // Add an existing tag to a bookmark
// db.sequelize.models.bookmark_tags.create({
//     BookmarkId: request.query.bookmark,
//     TagId: request.query.tag
// }).then(function(result) {
//     response.json(result);
// });

// // PUTS

// // Edit username / password

// // Edit collection name
// db.Collection.update({
//     name: request.query.name
// }, {
//     where: {
//         id: request.query.collection
//     }
// }).then(function (result) {
//     response.json(result.affectedRows);
// });

// // Edit parent collection(moving subcollection to new parent)
// db.Collection.update({
//     ParentCollection: request.query.newParentCollection
// }, {
//     where: {
//         id: request.query.collection
//     }
// }).then(function (result) {
//     response.json(result.affectedRows);
// });

// // Edit bookmark name
// db.Bookmark.update({
//     name: request.query.newName
// }, {
//     where: {
//         id: request.query.bookmark
//     }
// }).then(function (result) {
//     response.json(result.affectedRows);
// });

// // Edit bookmark url
// db.Bookmark.update({
//     url: request.query.newURL
// }, {
//     where: {
//         id: request.query.bookmark
//     }
// }).then(function (result) {
//     response.json(result.affectedRows);
// });


// // Edit bookmark comment
// db.Bookmark.update({
//     comment: request.query.newComment
// }, {
//     where: {
//         id: request.query.bookmark
//     }
// }).then(function (result) {
//     response.json(result.affectedRows);
// });

// Move bookmark to different collection
//      DELETE INSTANCE IN LINKING TABLE LINKING BOOKMARK TO COLLECTION
//      CREATE NEW ROW IN LINKING TABLE TO LINK BOOKMARK TO DIFFERENT COLLECTION

// DELETES

// Remove user

// Remove collection

// Remove bookmark

// Remove tag from bookmark

// Remove tag

// Remove bookmark from single collection (only if bookmark belongs to more than 1 collection)

