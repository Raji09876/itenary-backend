module.exports = (sequelize, Sequelize) => {
    const Bookings = sequelize.define(
      'Booking',
      {
        booking_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        booking_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        duration_days: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        timestamps: false,
      }
    );
    return Bookings;
    }