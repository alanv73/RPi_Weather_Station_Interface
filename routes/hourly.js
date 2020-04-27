const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const express = require('express'),
    app = express(),
    router = express.Router(),
    sequelize = require('../models/sqlize'),
    WxMeasurement = require('../models/wxmeasr'),
    WindDir = require('../models/winddir');

router.get('/', (req, res) => {
    WxMeasurement.findAll({
        attributes: [
            'AMBIENT_TEMPERATURE', 'GROUND_TEMPERATURE', 'AIR_PRESSURE',
            'HUMIDITY', 'WIND_DIRECTION', 'WIND_SPEED',
            'WIND_GUST_SPEED', 'WIND_CHILL', 'HEAT_IDX', 'DEW_PT',
            'RAINFALL', 'CREATED'
        ],
        where: {
            CREATED: {
                [Op.gte]: new Date(new Date() - (60 * 60 * 1000))
            }
        },
        raw: true
    }).then(rows => {
        // console.log(rows);
        const hourlyData = rows;

        WindDir.findOne({
            attributes: [
                'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S',
                'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
            ],
            raw: true
        }).then(wind => {
            res.render('hourly', {
                data: hourlyData,
                windDir: wind
            });
        }).catch(err => {
            console.error('Error :\n', err.message);
        });

    }).catch(err => {
        console.error('Error :\n', err.message);
    });
});

module.exports = router;
