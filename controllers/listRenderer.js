const express   = require('express');
const router    = express.Router();
const db        = require('../models');

router.get("/", async function(request, response) {

    // 1. GET ALL UNCATEGORIZED BOOKMARKS
    // Check if logged in
    if (!request.session.user) {
        response.status(401).send("Not logged in");
        return;
    }

    const uncategorizedBookmarks = await db.sequelize.query(
        'SELECT `id`, `UserId`, `name`, `url`, `color` FROM bookmarks ' +
        'LEFT JOIN bookmark_collections ON bookmark_collections.BookmarkId = bookmarks.id ' +
        'WHERE bookmark_collections.BookmarkId IS NULL', { type: QueryTypes.SELECT });

    console.log(uncategorizedBookmarks);
    // 2. GET ALL TOP-LVL COLLECTIONS
    // 3. FOR EACH COLLECTION, GET ALL SUB-COLLECTIONS
    // 4. FOR EACH COLLECTION, GET ALL BOOKMARKS

});

module.exports = router;