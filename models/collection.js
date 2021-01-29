

module.exports = function (sequelize, DataTypes) {
    const Collection = sequelize.define("Collection", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Collection.associate = function(models) {
        Collection.belongsTo(models.User);
        Collection.belongsToMany(models.Bookmark, {through: 'bookmark_collections'});
        Collection.hasMany(Collection, {foreignKey: 'ParentCollection'});

    }

    return Collection;
}