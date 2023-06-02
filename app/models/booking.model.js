module.exports = (sequelize, Sequelize) => {
  const Bookings = sequelize.define(
    'Booking',
    {
      booking_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      timestamps: true,
    }
  );
  return Bookings;
  }