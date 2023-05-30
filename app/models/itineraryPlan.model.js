
module.exports = (sequelize, Sequelize) => {
    const ItineraryPlan = sequelize.define('ItineraryPlan', {
      plan_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      day: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      },
      {
        timestamps: false,
      });
      return ItineraryPlan;
    }