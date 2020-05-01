const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const express = require('express'),
    app = express(),
    router = express.Router(),
    moment = require('moment'),
    sequelize = require('../models/sqlize'),
    WxMeasurement = require('../models/wxmeasr'),
    WindDir = require('../models/winddir');

var getDailyData = function (req, res, startDateTime) {
    // console.log(`getDailyData startDateTime: ${startDateTime}`);
    let startDate = new Date(startDateTime);
    // console.log(`getDailyData startDate: ${moment(startDate).format('YYYYMMDD')}`);

    WxMeasurement.findAll({
        attributes: [
            'AMBIENT_TEMPERATURE', 'GROUND_TEMPERATURE', 'AIR_PRESSURE',
            'HUMIDITY', 'WIND_DIRECTION', 'WIND_SPEED',
            'WIND_GUST_SPEED', 'WIND_CHILL', 'HEAT_IDX', 'DEW_PT',
            'RAINFALL', 'CREATED'
        ],
        where: sequelize.where(sequelize.fn('DATE', sequelize.col('CREATED')), moment(startDate).format('YYYYMMDD')),
        raw: true
    }).then(rows => {
        // console.log(rows);
        const dailyData = rows;

        WindDir.findOne({
            attributes: [
                'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S',
                'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
            ],
            raw: true
        }).then(wind => {
            res.render('daily', {
                data: dailyData,
                windDir: wind,
                start: moment(dailyData[0].CREATED).format('M/D/YYYY'),
                page: moment(dailyData[0].CREATED).format("dddd, MMMM Do YYYY")
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

    // console.log(`get date: ${today}`);
    getDailyData(req, res, today);

});

router.post('/', async (req, res) => {
    // console.log(`post date: ${req.body.start}`);
    const startDate = new Date(req.body.start);
    // console.log(`post dateified date: ${startDate}`);

    getDailyData(req, res, startDate);
});

module.exports = router;
