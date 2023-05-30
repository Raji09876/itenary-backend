module.exports = (app) => {
    const place = require("../controllers/placeController");
    var router = require("express").Router();
  
    // Create a new place
    router.post("/places/", place.createPlace);
  
    // Retrieve all place
    router.get("/places/", place.getAllPlaces);

    // Retrieve a single place with placeId
    router.get("/places/:place_id", place.getPlaceById);
  
    // Update an place with placeId
    router.put("/places/:place_id", place.updatePlace);
  
    // Delete an place with placeId
    router.delete("/places/:place_id", place.deletePlace);
  
    // // Create a new place
    // router.delete("/places/", place.deleteAll);

    // Route for '/itineraries/sort-by-date'
    router.get('/places/date/sort-by-date', place.getLatestPlaces);

  
     // Route for '/itineraries/most-rating'
     router.get('/places/ratings/most-rating', place.getPlacesByMostRating);
 
    app.use(router);
  };
  