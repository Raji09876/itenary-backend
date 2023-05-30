module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const itineraryController = require('../controllers/itineraryController');

    // GET /itineraries
    router.get('/itineraries/', itineraryController.getAllItineraries);

    // GET /itineraries/:itinerary_id
    router.get('/itineraries/:itinerary_id', itineraryController.getItineraryById);

    // POST /itineraries
    router.post('/itineraries/', itineraryController.createItinerary);

    // PUT /itineraries/:itinerary_id
    router.put('/itineraries/:itinerary_id', itineraryController.updateItinerary);

    // DELETE /itineraries/:itinerary_id
    router.delete('/itineraries/:itinerary_id', itineraryController.deleteItinerary);


    // Route for '/itineraries/most-rating'
    router.get('/itineraries/ratings/most-rating', itineraryController.getItinerariesByMostRating);

    // Route for '/itineraries/sort-by-date'
    router.get('/itineraries/date/sort-by-date', itineraryController.getItinerariesByStartDate);

    router.get('/itineraries/categories/:id',itineraryController.getItinerariesByCategory);

    app.use(router);
  };

