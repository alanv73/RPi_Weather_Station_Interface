const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express'),
    app = express(),
    router = express.Router(),
    sequelize = require('../models/sqlize'),
    WxMeasurement = require('../models/wxmeasr');

// Root Route - landing page
router.get('/', (req, res) => {
    res.render('landing');
});

// About Route - landing page
router.get('/about', (req, res) => {
    let currentTemp;

    WxMeasurement.findOne({
        attributes: [
            'ID', 'CREATED', 'AMBIENT_TEMPERATURE'
        ],
        order: [
            ['ID', 'DESC']
        ],
        raw: true
    }).then(tempRow => {
        currentTemp = tempRow.AMBIENT_TEMPERATURE;

        res.render('about', {
            temp: currentTemp
        });
    }).catch(err => {
        console.error('Error :\n', err.message);
    });

});

module.exports = router;