const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express'),
    app = express(),
    router = express.Router();

// Root Route - landing page
router.get('/', (req, res) => {
    res.render('landing');
});

module.exports = router;