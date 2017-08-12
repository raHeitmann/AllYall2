module.exports = function(sequelize, DataTypes) {
    var event = sequelize.define("event", {
        eventName: DataTypes.STRING,
        status: DataTypes.STRING,
        date: DataTypes.DATEONLY,
        totalAttendees: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

    event.associate = function(models) {
        event.hasMany(
                models.eventSuggestions, {
                    forgeignKey: "eventID",
                    onDelete: "cascade"
                })
            // event.hasMany(
            //     models.eventMembers, { 
            //         forgeignKey: "eventID", 
            //         onDelete: "cascade"
            //     })
        event.belongsToMany(models.user, { through: 'eventMembers' })

    };
    return event;
};