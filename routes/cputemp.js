const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const express = require('express'),
    app = express(),
    router = express.Router(),
    sequelize = require('../models/sqlize'),
    WxMeasurement = require('../models/wxmeasr');

function renderCPUTemp(
    res,
    start = new Date(new Date() - 1 * 24 * 60 * 60 * 1000),
    end = new Date()) {

    let pageData = {};

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
                'ID', 'AMBIENT_TEMPERATURE', 'GROUND_TEMPERATURE',
                'HUMIDITY', 'HEAT_IDX', 'DEW_PT',
                'CPU_TEMP', 'CREATED'
            ],
            where: {
                CREATED: {
                    [Op.between]: [start, end]
                }
            },
            raw: true
        }).then(rows => {
            // console.log(rows);
            pageData.data = rows;
            pageData.start = start;
            pageData.end = end;

            res.render('cputemp', pageData);

        }).catch(err => {
            console.error('Error :\n', err.message);
        });
    }).catch(err => {
        console.error('Error :\n', err.message);
    });


}

router.get('/', (req, res) => {
    renderCPUTemp(res);
});

router.post('/', (req, res) => {
    const startDate = req.body.start;
    const endDate = req.body.end;
    renderCPUTemp(res, new Date(startDate), new Date(endDate));
});

module.exports = router;
