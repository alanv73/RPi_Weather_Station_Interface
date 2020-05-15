const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const express = require('express'),
    app = express(),
    router = express.Router(),
    moment = require('moment'),
    sequelize = require('../models/sqlize'),
    WxMeasurement = require('../models/wxmeasr'),
    WindDir = require('../models/winddir');

// returns date object with minutes/seconds removed
// 6:35 => 6:00
function floorMinutes(date) {

    date.setHours(date.getHours());
    date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds

    return date;
}

var getHourlyData = function (req, res, startDateTime) {
    let pageData = {};
    let startDate = startDateTime;
    // console.log(`getHourlyData startDate: ${startDate}`);

    let endDate = new Date(startDateTime);
    endDate.setHours(endDate.getHours() + 1);
    // console.log(`getHourlyData endDate: ${endDate}`);

    WxMeasurement.findOne({
        attributes: [
            'ID', 'CREATED', 'AMBIENT_TEMPERATURE'
        ],
        order: [
            ['ID', 'DESC']
        ],
        raw: true
    }).then(tempRow => {
        pageData.temp = tempRow.AMBIENT_TEMPERATURE;
        // console.log(startDate);

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
            // logging: console.log,
            raw: true
        }).then(rows => {
            // console.log(rows);
            pageData.data = rows;

            WindDir.findOne({
                attributes: [
                    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S',
                    'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
                ],
                raw: true
            }).then(wind => {
                pageData.windDir = wind;

                pageData.start = moment(startDateTime).format('M/D/YYYY HH:mm');
                pageData.page = moment(startDateTime).format("dddd, MMMM Do YYYY, h:mm a");

                res.render('hourly', pageData);
            }).catch(err => {
                console.error('Error :\n', err.message);
            });

        }).catch(err => {
            console.error('Error :\n', err.message);
        });
    }).catch(err => {
        console.error('Error :\n', err.message);
    });


}

router.get('/', async (req, res) => {

    let today = new Date();
    let lastHour = new Date(today);
    lastHour.setHours(today.getHours() - 1);

    // console.log(`get date: ${lastHour}`);
    getHourlyData(req, res, lastHour);

});

router.post('/', async (req, res) => {
    // console.log(`post date: ${req.body.start}`);
    const startDate = new Date(req.body.start);
    // console.log(`post dateified date: ${startDate}`);

    getHourlyData(req, res, startDate);
});

module.exports = router;
