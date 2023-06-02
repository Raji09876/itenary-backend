module.exports = (app) => {
    const express = require('express');
    const bookingController = require('../controllers/bookingController');

    const router = express.Router();

    router.get('/booking/user/:userId', bookingController.getUserBookings);
    router.post("/booking/",bookingController.createUserBookings);
    app.use(router);
  };