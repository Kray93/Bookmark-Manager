const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [4]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    });

    User.associate = function(models) {
        User.hasMany(models.Collection);
    }

    User.beforeCreate( (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    })

    return User;
}