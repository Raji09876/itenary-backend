const db = require("../models");
const Itinerary = db.itinerary;
const ItineraryPlan = db.itineraryPlan;

const Op = db.Sequelize.Op;

// Get all itineraries
async function getAllItineraries(req, res) {
  try {
    const { from, to, date_start, date_end, category } = req.query;
    const filters = {
      [Op.and]: [],
    }; 
    if (category) {
      const categoryFilter = {
        [Op.or]: [
          { category_id: { [Op.like]: `%${category}%` } }
        ],
      };
      filters[Op.and].push(categoryFilter);
    }
    if (date_start) {
      filters[Op.and].push({ start_date: sequelize.where(sequelize.fn('DATE', sequelize.col('start_date')), date_start) });
    }
    if (date_end) {
      filters[Op.and].push({ end_date: sequelize.where(sequelize.fn('DATE', sequelize.col('end_date')), date_end) });
    }
    if (from) {
      filters[Op.and].push({ from_place: { [Op.like]: `%${from}%` } });
    }
    if (to) {
      filters[Op.and].push({ to_place: { [Op.like]: `%${to}%` } });
    }
    const itineraries = await Itinerary.findAll({ where: filters });
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
        include: [ItineraryPlan],
      }
    );
    if (itinerary) {
      res.status(200).json(itinerary);
    } else {
      res.status(404).json({ message: 'Itinerary not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.', error: JSON.stringify(error) });
  }
}

// Create a new itinerary
async function createItinerary(req, res) {
  const { title, description, start_date,end_date, duration_days, rating,price,from_place,to_place, category_id,image_url } = req.body;
  try {
    const itinerary = await Itinerary.create({
      title,
      description,
      start_date,
      end_date,
      duration_days,
      rating,
      price,
      from_place,
      to_place,
      category_id,
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
  const { title, description, start_date,end_date, duration_days, rating,price,from_place,to_place, category_id,image_url } = req.body;
  try {
    const itinerary = await Itinerary.findByPk(itinerary_id);
    if (itinerary) {
      await itinerary.update({
        title,
        description,
        start_date,
        end_date,
        duration_days,
        rating,
        price,
        from_place,
        to_place,
        category_id,
        image_url
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