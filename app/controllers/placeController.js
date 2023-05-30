const db = require("../models");
const Place = db.place;

// Get all places
async function getAllPlaces(req, res) {
  try {
    const places = await Place.findAll();
    res.status(200).json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

// Get place by ID
async function getPlaceById(req, res) {
  const { place_id } = req.params;
  try {
    const place = await Place.findByPk(place_id);
    if (place) {
      res.status(200).json(place);
    } else {
      res.status(404).json({ message: 'place not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

// Create a new place
async function createPlace(req, res) {
  const { title, description, address, rating, image_url } = req.body;
  try {
    const place = await Place.create({
      title,
      description,
      address,
      rating,
      image_url
    });
    res.status(201).json({ message: 'place created successfully.', place });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

// Update place by ID
async function updatePlace(req, res) {
  const { title, description, address, rating, image_url,place_id } = req.body;
  try {
    const place = await Place.findByPk(place_id);
    if (place) {
      await place.update({
        title,
        description,
        address,
        rating,
        image_url
      });
      res.status(200).json({ message: 'place updated successfully.' });
    } else {
      res.status(404).json({ message: 'place not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

// Delete place by ID
async function deletePlace(req, res) {
  const { place_id } = req.params;
  try {
    const place = await Place.findByPk(place_id);
    if (place) {
      await place.destroy();
      res.status(200).json({ message: 'place deleted successfully.' });
    } else {
      res.status(404).json({ message: 'place not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}


// Get all places sorted by most rating
async function getPlacesByMostRating(req, res) {
  try {
    const places = await Place.findAll({
      order: [['rating', 'DESC'],
      ['createdAt', 'DESC'],
    ],
    });

    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all places
async function getLatestPlaces(req, res) {
  try {
    const places = await Place.findAll({
      order: [['createdAt', 'DESC']],
    });

    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
  getPlacesByMostRating,
  getLatestPlaces
};
