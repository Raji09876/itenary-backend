module.exports = (app) => {
    const express = require('express');
    const categoryController = require('../controllers/categoryController');

    const router = express.Router();

    // Route for '/categories'
    router.get('/categories/', categoryController.getAllCategories);
    router.post("/categories/", categoryController.createCategory);
    app.use(router);
  };