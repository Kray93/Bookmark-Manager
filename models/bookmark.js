

module.exports = function (sequelize, DataTypes) {
    const Bookmark = sequelize.define("Bookmark", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        color: {
            type: DataTypes.ENUM,
            values: ['white', 'black', 'red', 'blue', 'yellow', 'green', 'orange', 'purple', 'pink']
        }
    });

    Bookmark.associate = function(models) {
        Bookmark.belongsTo(models.User);
        Bookmark.belongsToMany(models.Tag, { through: 'bookmark_tags' });
        Bookmark.belongsToMany(models.Collection, { through: 'bookmark_collections' });
    }

    return Bookmark;
}