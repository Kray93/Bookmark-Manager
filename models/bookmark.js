

module.exports = function (sequelize, DataTypes) {
    const Bookmark = sequelize.define("Bookmark", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true 
            }
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        color: {
            type: DataTypes.ENUM,
            values: ['lightgray', 'black', 'crimson', 'royalblue', 'gold', 'mediumseagreen', 'orange', 'purple', 'palevioletred'],
            allowNull: true
        }
    });

    Bookmark.associate = function(models) {
        Bookmark.belongsTo(models.User);
        Bookmark.belongsToMany(models.Tag, { through: 'bookmark_tags' });
        Bookmark.belongsToMany(models.Collection, { through: 'bookmark_collections' });
    }

    return Bookmark;
}