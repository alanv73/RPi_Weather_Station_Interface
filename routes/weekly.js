const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const express = require('express'),
    app = express(),
    router = express.Router(),
    moment = require('moment'),
    sequelize = require('../models/sqlize'),
    AvgByHour = require('../models/avgbyhour'),
    AvgByDay = require('../models/avgbyday'),
    WxMeasurement = require('../models/wxmeasr'),
    WindDir = require('../models/winddir');

var getWeeklyData = function (req, res, startDateTime) {
    let currentTemp;
    let startDate = startDateTime;
    // console.log(`getWeeklyData startDate: ${startDate}`);

    let endDate = new Date(startDateTime);
    endDate.setDate(startDateTime.getDate() + 7);
    // console.log(`getWeeklyData endDate: ${endDate}`);

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
    }).catch(err => {
        console.error('Error :\n', err.message);
    });

    AvgByDay.findAll({
        attributes: [
            'AMBIENT_TEMPERATURE_MAX', 'AMBIENT_TEMPERATURE_MIN', 'GROUND_TEMPERATURE',
            'AIR_PRESSURE', 'HUMIDITY', 'WIND_DIRECTION', 'WIND_SPEED',
            'WIND_GUST_SPEED', 'WIND_CHILL', 'HEAT_IDX', 'DEW_PT',
            'RAINFALL', 'CREATED', 'CREATED_DATE'
        ],
        where: {
            CREATED: {
                [Op.between]: [startDate, endDate]
            }
        },
        raw: true
    }).then(rows => {
        // console.log(rows);
        const weeklyData = rows;

        WindDir.findOne({
            attributes: [
                'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S',
                'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
            ],
            raw: true
        }).then(wind => {
            res.render('weekly', {
                data: weeklyData,
                windDir: wind,
                start: moment(weeklyData[0].CREATED).format('MM/DD/YYYY HH:mm:ss'),
                page: moment(weeklyData[0].CREATED).format("dddd, MMMM Do YYYY, h:mm a"),// moment().format("dddd, MMMM Do YYYY, h:mm a")
                temp: currentTemp
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
    let lastWeek = new Date(today)
    lastWeek.setDate(today.getDate() - 7);

    getWeeklyData(req, res, lastWeek);

});

router.post('/', async (req, res) => {
    const startDate = new Date(req.body.start);
    // console.log(`post date: ${startDate}`);
    getWeeklyData(req, res, startDate);
});

module.exports = router;
