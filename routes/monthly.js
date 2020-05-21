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

var handleErrors = function (req, res, pageData) {
    res.render('404', pageData);
}

var getMonthlyData = function (req, res, startDateTime) {
    let pageData = {};
    let startDate = moment(startDateTime);
    // console.log(`getMonthlyData startDate: ${startDate}`);

    let endDate = new Date(startDateTime);
    endDate.setMonth(startDateTime.getMonth() + 1);
    endDate = moment(endDate);
    // console.log(`getWeeklyData endDate: ${endDate}`);
    // console.log(`getMonthlyData startDate2: ${moment(startDate)}`);

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

        AvgByDay.findAll({
            attributes: [
                'AMBIENT_TEMPERATURE_MAX', 'AMBIENT_TEMPERATURE_MIN', 'GROUND_TEMPERATURE',
                'AIR_PRESSURE', 'HUMIDITY', 'WIND_DIRECTION', 'WIND_SPEED',
                'WIND_GUST_SPEED', 'WIND_CHILL', 'HEAT_IDX', 'DEW_PT',
                'RAINFALL', 'CREATED', 'CREATED_DATE'
            ],
            where: {
                CREATED: {
                    [Op.between]: [startDate.format('YYYYMMDD'), endDate.format('YYYYMMDD')]
                }
            },
            // logging: console.log,
            raw: true
        }).then(rows => {
            pageData.data = rows;
            // console.log(rows);

            WindDir.findOne({
                attributes: [
                    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S',
                    'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
                ],
                raw: true
            }).then(wind => {
                pageData.windDir = wind;
                // console.log(pageData.data);

                pageData.start = moment(startDateTime).format('MM/DD/YYYY HH:mm:ss');
                pageData.page = moment(startDateTime).format("dddd, MMMM Do YYYY");

                res.render('monthly', pageData);
            }).catch(err => {
                console.error('WindDir Error :\n', err.message);
                handleErrors(pageData);
            });
        }).catch(err => {
            console.error('AvgByDay Error :\n', err.message);
            handleErrors(pageData);
        });
    }).catch(err => {
        console.error('WxMeasurement Error :\n', err.message);
        handleErrors(pageData);
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
    // console.log(`Monthly post date: ${req.body.start}`);
    // console.log(`passed date: ${startDate}`);
    getMonthlyData(req, res, startDate);
});

module.exports = router;
