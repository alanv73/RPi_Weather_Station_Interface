const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const express = require('express'),
    app = express(),
    router = express.Router(),
    sequelize = require('../models/sqlize'),
    WxMeasurement = require('../models/wxmeasr');

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
                [Op.gte]: new Date('2020-04-11 19:00:00') // new Date(new Date() - (60 * 60 * 1000))
            }
        },
        raw: true
    }).then(rows => {
        // let AMBIENT_TEMPERATURE = [],
        //     GROUND_TEMPERATURE = [],
        //     AIR_PRESSURE = [],
        //     HUMIDITY = [],
        //     WIND_DIRECTION = [],
        //     WIND_SPEED = [],
        //     WIND_GUST_SPEED = [],
        //     WIND_CHILL = [],
        //     HEAT_IDX = [],
        //     DEW_PT = [],
        //     RAINFALL = [],
        //     CREATED = [];
        // rows.forEach(row => {
        //     AMBIENT_TEMPERATURE.push(row.AMBIENT_TEMPERATURE);
        //     GROUND_TEMPERATURE.push(row.GROUND_TEMPERATURE);
        //     AIR_PRESSURE.push(row.AIR_PRESSURE);
        //     HUMIDITY.push(row.HUMIDITY);
        //     WIND_DIRECTION.push(row.WIND_DIRECTION);
        //     WIND_SPEED.push(row.WIND_SPEED);
        //     WIND_GUST_SPEED.push(row.WIND_GUST_SPEED);
        //     WIND_CHILL.push(row.WIND_CHILL);
        //     HEAT_IDX.push(row.HEAT_IDX);
        //     DEW_PT.push(row.DEW_PT);
        //     RAINFALL.push(row.RAINFALL);
        //     CREATED.push(row.CREATED);
        // });
        res.render('hourly', {
            // AMBIENT_TEMPERATURE: AMBIENT_TEMPERATURE,
            // GROUND_TEMPERATURE: GROUND_TEMPERATURE,
            // AIR_PRESSURE: AIR_PRESSURE,
            // HUMIDITY: HUMIDITY,
            // WIND_DIRECTION: WIND_DIRECTION,
            // WIND_SPEED: WIND_SPEED,
            // WIND_GUST_SPEED: WIND_GUST_SPEED,
            // WIND_CHILL: WIND_CHILL,
            // HEAT_IDX: HEAT_IDX,
            // DEW_PT: DEW_PT,
            // RAINFALL: RAINFALL,
            // CREATED: CREATED
            rowData: rows
        });
        // console.log(rows);
    }).catch(err => {
        console.error('Error :\n', err.message);
    });
});

module.exports = router;
