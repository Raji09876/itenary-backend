const db = require("../models");
const Itinerary = db.itinerary;
const ItineraryPlan = db.itineraryPlan;

const Op = db.Sequelize.Op;

// Get all itineraries
async function getAllItineraries(req, res) {
  try {
    const itineraries = await Itinerary.findAll();
    res.status(200).json(itineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

// Get itinerary by ID
async function getItineraryById(req, res) {
  const { itinerary_id } = req.params;
  try {
    const itinerary = await Itinerary.findByPk(itinerary_id, 
      {
      // include: [ItineraryPlan, User]
      include: [ItineraryPlan]
    }
    );
    if (itinerary) {
      res.status(200).json(itinerary);
    } else {
      res.status(404).json({ message: 'Itinerary not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

// Create a new itinerary
async function createItinerary(req, res) {
  const { title, description, start_date, duration_days, max_capacity, rating, category_id, place_id, user_id,image_url } = req.body;
  try {
    const itinerary = await Itinerary.create({
      title,
      description,
      start_date,
      duration_days,
      max_capacity,
      rating,
      category_id,
      place_id,
      user_id,
      image_url
    });
    res.status(201).json({ message: 'Itinerary created successfully.', itinerary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

// Update itinerary by ID
async function updateItinerary(req, res) {
  const { itinerary_id } = req.params;
  const { title, description, start_date, duration_days, max_capacity, rating, category_id, place_id, user_id } = req.body;
  try {
    const itinerary = await Itinerary.findByPk(itinerary_id);
    if (itinerary) {
      await itinerary.update({
        title,
        description,
        start_date,
        duration_days,
        max_capacity,
        rating,
        category_id,
        place_id,
        user_id
      });
      res.status(200).json({ message: 'Itinerary updated successfully.' });
    } else {
      res.status(404).json({ message: 'Itinerary not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

// Delete itinerary by ID
async function deleteItinerary(req, res) {
  const { itinerary_id } = req.params;
  try {
    const itinerary = await Itinerary.findByPk(itinerary_id);
    if (itinerary) {
      await itinerary.destroy();
      res.status(200).json({ message: 'Itinerary deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Itinerary not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

// Get itineraries by category
async function getItinerariesByCategory(req, res) {
  try {
    const { category_id } = req.params;

    // Find all itineraries with the specified category_id
    const itineraries = await Itinerary.findAll({
      where: {
        category_id: category_id,
      },
    });

    // Return the found itineraries
    res.json(itineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get all itineraries sorted by most rating
async function getItinerariesByMostRating(req, res) {
  try {
    const itineraries = await Itinerary.findAll({
      order: [['rating', 'DESC'],
      ['createdAt', 'DESC'],
    ],
    });

    res.json(itineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all itineraries sorted by start date
async function getItinerariesByStartDate(req, res) {
  try {
    const itineraries = await Itinerary.findAll({
      order: [['start_date', 'ASC']],
    });

    res.json(itineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllItineraries,
  getItineraryById,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  getItinerariesByCategory,
  getItinerariesByMostRating,
  getItinerariesByStartDate
};
