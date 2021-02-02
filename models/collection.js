

module.exports = function (sequelize, DataTypes) {
    const Collection = sequelize.define("Collection", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [2]
            }
        },
        color: {
            type: DataTypes.ENUM,
            values: ['white', 'black', 'red', 'blue', 'yellow', 'green', 'orange', 'purple', 'pink']
        }
    });

    Collection.associate = function(models) {
        Collection.belongsTo(models.User);
        Collection.belongsToMany(models.Bookmark, {through: 'bookmark_collections'});
        Collection.hasMany(Collection, {foreignKey: 'ParentCollection'});

    }

    return Collection;
}