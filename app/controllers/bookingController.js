const db = require("../models");
const Booking = db.booking;
// Get bookings of a user by user ID
exports.getUserBookings = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await Booking.findAll({
      where: { user_id: userId }
    });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createUserBookings = async (req, res) => {
  const { user_id, itinerary_id } = req.body;
  try {
    const booking = await Booking.create({
      user_id,itinerary_id
    });
    res.status(201).json({ message: 'booking created successfully.', booking: booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
