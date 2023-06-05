
module.exports = (sequelize, Sequelize) => {
  const Itinerary = sequelize.define('Itinerary', {
    itinerary_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    start_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    end_date: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    duration_days: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    rating: {
      type: Sequelize.FLOAT,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
    },
    from_place: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    to_place: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    image_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
   timestamps: true,
  });
  return Itinerary;
  }