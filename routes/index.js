require('dotenv').config();
const { Sequelize, Model, DataTypes } = require('sequelize');
const MAP_KEY = process.env.MAPKEY;
const LAT = process.env.LATITUDE;
const LONG = process.env.LONGITUDE;
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
    let currentHumidity;
    let currentPressure;

    WxMeasurement.findOne({
        attributes: [
            'ID', 'CREATED', 'AMBIENT_TEMPERATURE',
            'HUMIDITY', 'AIR_PRESSURE'
        ],
        order: [
            ['ID', 'DESC']
        ],
        raw: true
    }).then(tempRow => {
        currentTemp = tempRow.AMBIENT_TEMPERATURE;
        currentHumidity = tempRow.HUMIDITY;
        currentPressure = tempRow.AIR_PRESSURE;

        res.render('about', {
            temp: currentTemp,
            humidity: currentHumidity,
            pressure: currentPressure,
            location: {
                key: MAP_KEY,
                lat: LAT,
                lng: LONG
            }
        });
    }).catch(err => {
        console.error('Error :\n', err.message);
    });

});

module.exports = router;