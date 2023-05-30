module.exports = (sequelize, Sequelize) => {
    const ItineraryImage = sequelize.define('ItineraryImage', {
      image_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
    },
    {
      timestamps: false,
    });
    return ItineraryImage;
    }
    