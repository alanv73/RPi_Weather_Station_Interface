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

var getMonthlyData = function (req, res, startDateTime) {
    let currentTemp;
    let startDate = startDateTime;
    // console.log(`getWeeklyData startDate: ${startDate}`);

    let endDate = new Date(startDateTime);
    endDate.setMonth(startDateTime.getMonth() + 1);
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
        const monthlyData = rows;

        WindDir.findOne({
            attributes: [
                'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S',
                'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
            ],
            raw: true
        }).then(wind => {
            res.render('monthly', {
                data: monthlyData,
                windDir: wind,
                start: moment(monthlyData[0].CREATED).format('MM/DD/YYYY HH:mm:ss'),
                page: moment(monthlyData[0].CREATED).format("dddd, MMMM Do YYYY, h:mm a"),// moment().format("dddd, MMMM Do YYYY, h:mm a")
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
    let lastMonth = new Date(today)
    lastMonth.setMonth(today.getMonth() - 1);

    getMonthlyData(req, res, lastMonth);

});

router.post('/', async (req, res) => {
    const startDate = new Date(req.body.start);
    // console.log(`post date: ${startDate}`);
    getMonthlyData(req, res, startDate);
});

module.exports = router;
