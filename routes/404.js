const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const express = require('express'),
    app = express(),
    router = express.Router(),
    sequelize = require('../models/sqlize'),
    WxMeasurement = require('../models/wxmeasr');

router.get('/', function (req, res) {
    WxMeasurement.findOne({
        attributes: [
            'ID', 'CREATED', 'AMBIENT_TEMPERATURE'
        ],
        order: [
            ['ID', 'DESC']
        ],
        raw: true
    }).then(tempRow => {
        let pageData = {};
        pageData.temp = tempRow.AMBIENT_TEMPERATURE;

        res.render('404', pageData);
    }).catch(err => {
        console.error('Error :\n', err.message);
    });
});

module.exports = router;