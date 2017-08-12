module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define("user", {
        userName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: {
          type: DataTypes.STRING(30),
          allowNull: false,
          defaultValue: 'random.PNG'
        }
    });

    user.associate = function(models) {
        user.hasMany(
            models.relationships, { 
                forgeignKey: "userID",
                onDelete: "cascade"
            })
        user.hasMany(
            models.preferences, { 
                forgeignKey: "userID", 
                onDelete: "cascade"
            })
        user.belongsToMany(models.event, {through: 'eventMembers'})

    };
    return user;
};