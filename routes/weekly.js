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

var getWeeklyData = function (req, res, startDateTime) {
    let pageData = {};
    let startDate = moment(startDateTime);
    // console.log(`getWeeklyData startDate: ${startDate}`);

    let endDate = new Date(startDateTime);
    endDate.setDate(startDateTime.getDate() + 7);
    endDate = moment(endDate);
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
        pageData.temp = tempRow.AMBIENT_TEMPERATURE;

        AvgByDay.findAll({
            attributes: [
                'AMBIENT_TEMPERATURE_MAX', 'AMBIENT_TEMPERATURE_MIN', 'GROUND_TEMPERATURE',
                'AIR_PRESSURE', 'HUMIDITY', 'WIND_DIRECTION', 'WIND_SPEED',
                'WIND_GUST_SPEED', 'WIND_CHILL', 'HEAT_IDX', 'DEW_PT',
                'RAINFALL', 'CREATED', 'CREATED_DATE'
            ],
            where: {
                CREATED_DATE: {
                    [Op.between]: [startDate.format('YYYYMMDD'), endDate.format('YYYYMMDD')]
                }
            },
            raw: true
        }).then(rows => {
            // console.log(rows);
            pageData.data = rows;

            sequelize.query('CALL windir_histogram (:hist_start, :hist_end);', {
                replacements: {
                    hist_start: startDate.format('YYYYMMDD'),
                    hist_end: endDate.format('YYYYMMDD'),
                    type: sequelize.QueryTypes.SELECT,
                    model: WindDir,
                    mapToModel: true,
                    raw: true
                }
            }).then(wind => {
                pageData.windDir = wind[0];

                pageData.start = moment(startDateTime).format('MM/DD/YYYY HH:mm:ss');
                pageData.page = moment(startDateTime).format("dddd, MMMM Do YYYY");

                res.render('weekly', pageData);
            }).catch(err => {
                console.error('Error :\n', err.message);
                handleErrors(pageData);
            });

        }).catch(err => {
            console.error('Error :\n', err.message);
            handleErrors(pageData);
        });
    }).catch(err => {
        console.error('Error :\n', err.message);
        handleErrors(pageData);
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
