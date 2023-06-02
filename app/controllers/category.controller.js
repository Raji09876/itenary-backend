const db = require("../models");
const Category = db.category;

const Op = db.Sequelize.Op;
// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new category
exports.createCategory = async(req, res) => {
  const { category_name, category_description } = req.body;
  try {
    const category = await Category.create({
      category_name,category_description
    });
    res.status(201).json({ message: 'category created successfully.', category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}