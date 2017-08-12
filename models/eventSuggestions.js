module.exports = function(sequelize, DataTypes) {
    var eventSuggestions = sequelize.define("eventSuggestions", {
        category: DataTypes.STRING,
        title: DataTypes.STRING,
        status: DataTypes.STRING,
        time: DataTypes.DATE,
        endTime: DataTypes.DATE,
        price: DataTypes.INTEGER,
        location: DataTypes.STRING,
        date: DataTypes.DATEONLY,
        upVote: DataTypes.INTEGER,
        downVote: DataTypes.INTEGER,
        latitude: DataTypes.STRING,
        longtitude: DataTypes.STRING,
        link: DataTypes.STRING,
        ticketInfo: DataTypes.STRING,
        upvotes: DataTypes.INTEGER,
        venue: DataTypes.STRING
    });

    eventSuggestions.associate = function(models) {
        eventSuggestions.belongsTo(models.event, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return eventSuggestions;
};