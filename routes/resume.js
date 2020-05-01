const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const express = require('express'),
    app = express(),
    path = require('path'),
    router = express.Router(),
    moment = require('moment');

router.get('/', async (req, res) => {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../resume') });
});

module.exports = router;