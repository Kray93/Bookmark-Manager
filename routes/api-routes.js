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
            username: request.body.username,
            password: request.body.password
        }).then(function(result) {
            response.json(result);
        });
    });


    // Test; directly insert a collection
    app.post("/api/seed/collection", function(request, response) {

        db.Collection.create({
            name: request.body.name,
            UserId: request.body.user
        }).then(function (result) {
            response.json(result);
        });
    });

    // Test; directly insert a bookmark
    app.post("/api/seed/bookmark", async function(request, response) {
        const newBookmark = await db.Bookmark.create({
            name: request.body.name,
            url: request.body.url,
            UserId: request.body.user
        });

        console.log(db.sequelize.models);

        db.sequelize.models.bookmark_collections.create({
            BookmarkId: newBookmark.dataValues.id,
            CollectionId: request.body.collection
        }).then(function(result) {
            response.json(result);
        });
    });

    // Test; directly pull bookmarks in a collection
    app.get("/api/getBookmarksByCollection", function(request, response) {
        db.Bookmark.findAll({
            where: {
                UserId: request.body.user
            },
            include: [{
                model: db.User
            }, {
                model: db.Collection,
                where: {
                    id: request.body.collection
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
                UserId: request.body.user
            },
            include: [
                {
                    model: db.User
                }, {
                    model: db.Tag,
                    where: {
                        id: request.body.tag
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
//         UserId: request.body.user
//     },
//     include: [{
//         model: db.User
//     }, {
//         model: db.Collection,
//         where: {
//             id: request.body.collection
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
//         UserId: request.body.user
//     },
//     include: [
//         {
//             model: db.User
//         }, {
//             model: db.Tag,
//             where: {
//                 id: request.body.tag
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
//         UserId: request.body.user
//     }, 
//     include: [
//         {
//             model: db.User
//         }, {
//             model: db.Bookmark,
//             where: {
//                 id: request.body.bookmark
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
//     username: request.body.username
// }).then(function (result) {
//     response.json(result);
// })

// // Add a new collection to a user
// db.Collection.create({
//     name: request.body.name,
//     UserId: request.body.user,
//     ParentCollection: request.body.parent // NULL if not a sub-collection
// }).then(function (result) {
//     response.json(result);
// })

// // Add a new collection to a collection
// // SEE ABOVE

// // Add a new bookmark to a collection
// const newBookmark = await db.Bookmark.create({
//     name: request.body.name,
//     url: request.body.url,
//     UserId: request.body.user
// });

// db.sequelize.models.bookmark_collections.create({
//     BookmarkId: newBookmark.dataValues.id,
//     CollectionId: request.body.collection
// }).then(function (result) {
//     response.json(result);
// });

// // Add an existing bookmark to a collection
// db.sequelize.models.bookmark_collections.create({
//     BookmarkId: newBookmark.dataValues.id,
//     CollectionId: request.body.collection
// }).then(function (result) {
//     response.json(result);
// });

// // Add a new tag to an existing bookmark
// const newTag = await db.Tag.create({
//     name: request.body.name,
//     UserId: request.body.user
// });

// db.sequelize.models.bookmark_tags.create({
//     BookmarkId: request.body.bookmark,
//     TagId: newTag.dataValues.id
// }).then(function(result) {
//     response.json(result);
// });

// // Add an existing tag to a bookmark
// db.sequelize.models.bookmark_tags.create({
//     BookmarkId: request.body.bookmark,
//     TagId: request.body.tag
// }).then(function(result) {
//     response.json(result);
// });

// // PUTS

// // Edit username / password

// // Edit collection name
// db.Collection.update({
//     name: request.body.name
// }, {
//     where: {
//         id: request.body.collection
//     }
// }).then(function (result) {
//     response.json(result.affectedRows);
// });

// // Edit parent collection(moving subcollection to new parent)
// db.Collection.update({
//     ParentCollection: request.body.newParentCollection
// }, {
//     where: {
//         id: request.body.collection
//     }
// }).then(function (result) {
//     response.json(result.affectedRows);
// });

// // Edit bookmark name
// db.Bookmark.update({
//     name: request.body.newName
// }, {
//     where: {
//         id: request.body.bookmark
//     }
// }).then(function (result) {
//     response.json(result.affectedRows);
// });

// // Edit bookmark url
// db.Bookmark.update({
//     url: request.body.newURL
// }, {
//     where: {
//         id: request.body.bookmark
//     }
// }).then(function (result) {
//     response.json(result.affectedRows);
// });


// // Edit bookmark comment
// db.Bookmark.update({
//     comment: request.body.newComment
// }, {
//     where: {
//         id: request.body.bookmark
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

