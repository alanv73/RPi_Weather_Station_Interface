const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const express = require('express'),
    app = express(),
    router = express.Router(),
    moment = require('moment'),
    sequelize = require('../models/sqlize'),
    WxMeasurement = require('../models/wxmeasr'),
    WindDir = require('../models/winddir');

var getHourlyData = function (req, res, endDateTime) {
    let startDate = new Date(new Date(endDateTime) - (65 * 60 * 1000));
    let endDate = new Date(endDateTime);

    WxMeasurement.findAll({
        attributes: [
            'AMBIENT_TEMPERATURE', 'GROUND_TEMPERATURE', 'AIR_PRESSURE',
            'HUMIDITY', 'WIND_DIRECTION', 'WIND_SPEED',
            'WIND_GUST_SPEED', 'WIND_CHILL', 'HEAT_IDX', 'DEW_PT',
            'RAINFALL', 'CREATED'
        ],
        where: {
            CREATED: {
                [Op.between]: [startDate, endDate]
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
                windDir: wind,
                end: moment(hourlyData[hourlyData.length - 1].CREATED).format('MM/DD/YYYY HH:mm:ss'),
                page: moment(hourlyData[hourlyData.length - 1].CREATED).format("dddd, MMMM Do YYYY, h:mm a")// moment().format("dddd, MMMM Do YYYY, h:mm a")
            });
        }).catch(err => {
            console.error('Error :\n', err.message);
        });

    }).catch(err => {
        console.error('Error :\n', err.message);
    });
}

router.get('/', async (req, res) => {
    // WxMeasurement.findAll({
    //     attributes: [
    //         'AMBIENT_TEMPERATURE', 'GROUND_TEMPERATURE', 'AIR_PRESSURE',
    //         'HUMIDITY', 'WIND_DIRECTION', 'WIND_SPEED',
    //         'WIND_GUST_SPEED', 'WIND_CHILL', 'HEAT_IDX', 'DEW_PT',
    //         'RAINFALL', 'CREATED'
    //     ],
    //     where: {
    //         CREATED: {
    //             [Op.gte]: moment().subtract(65, 'minutes').toDate() // new Date(moment() - (60 * 60 * 1000))
    //         }
    //     },
    //     raw: true
    // }).then(rows => {
    //     // console.log(rows);
    //     const hourlyData = rows;

    //     WindDir.findOne({
    //         attributes: [
    //             'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S',
    //             'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
    //         ],
    //         raw: true
    //     }).then(wind => {
    //         res.render('hourly', {
    //             data: hourlyData,
    //             windDir: wind,
    //             page: moment(hourlyData.slice(-1).CREATED).format("dddd, MMMM Do YYYY, h:mm a")// moment().format("dddd, MMMM Do YYYY, h:mm a")
    //         });
    //     }).catch(err => {
    //         console.error('Error :\n', err.message);
    //     });

    // }).catch(err => {
    //     console.error('Error :\n', err.message);
    // });

    let data = getHourlyData(req, res, moment());

});

router.post('/', async (req, res) => {
    const endDate = req.body.end;
    getHourlyData(req, res, endDate);
});

module.exports = router;
