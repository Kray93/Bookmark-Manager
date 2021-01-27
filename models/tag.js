

module.exports = function (sequelize, DataTypes) {
    const Tag = sequelize.define("Tag", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Tag.associate = function (models) {
        Tag.belongsTo(models.User);
        Tag.belongsToMany(models.Bookmark, { through: 'bookmark_tags' });
    }


    return Tag;
}