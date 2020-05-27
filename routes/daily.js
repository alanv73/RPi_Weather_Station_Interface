const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const express = require('express'),
    app = express(),
    router = express.Router(),
    moment = require('moment'),
    sequelize = require('../models/sqlize'),
    WxMeasurement = require('../models/wxmeasr'),
    WindDir = require('../models/winddir');

var handleErrors = function (req, res, pageData) {
    res.render('404', pageData);
}

var getDailyData = function (req, res, startDateTime) {
    let pageData = {};
    // console.log(`getDailyData startDateTime: ${startDateTime}`);
    let startDate = new Date(startDateTime);
    let spStartDate = moment(startDateTime);
    let spEndDate = new Date(spStartDate);
    spEndDate.setDate(spEndDate.getDate() + 1);
    spEndDate = moment(spEndDate);
    // console.log(`getDailyData startDate: ${moment(startDate).format('YYYYMMDD')}`);

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
            pageData.data = rows;

            sequelize.query('CALL windir_histogram (:hist_start, :hist_end);', {
                replacements: {
                    hist_start: spStartDate.format('YYYYMMDD'),
                    hist_end: spEndDate.format('YYYYMMDD'),
                    type: sequelize.QueryTypes.SELECT,
                    model: WindDir,
                    mapToModel: true,
                    raw: true
                }
            }).then(wind => {
                pageData.windDir = wind[0];

                pageData.start = moment(startDateTime).format('MM/DD/YYYY HH:mm:ss');
                pageData.page = moment(startDateTime).format("dddd, MMMM Do YYYY");

                res.render('daily', pageData);
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
