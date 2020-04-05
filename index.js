const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express'),
    app = express(),
    router = express.Router(),
    sequelize = require('./models/sqlize'),
    WxMeasurement = require('./models/wxmeasr');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

async function testDB() {
    await sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
        closeDB();
    }).catch(err => {
        console.error('Unable to connect to the database:\n', err.message);
    });
}

async function selectAll() {
    let wxData;
    const allData = await WxMeasurement.findAll({
        attributes: [
            'AMBIENT_TEMPERATURE', 'GROUND_TEMPERATURE', 'AIR_PRESSURE',
            'HUMIDITY', 'WIND_DIRECTION', 'WIND_SPEED',
            'WIND_GUST_SPEED', 'WIND_CHILL', 'HEAT_IDX', 'DEW_PT',
            'RAINFALL', 'CREATED'
        ]
    }).then((data) => {
        console.log('found.');
        // let wxData = JSON.stringify(data, null, 2)
        data.forEach(dataPoint => {
            console.log(
                dataPoint.CREATED,
                dataPoint.AMBIENT_TEMPERATURE,
                dataPoint.GROUND_TEMPERATURE,
                dataPoint.AIR_PRESSURE,
                dataPoint.HUMIDITY,
                dataPoint.WIND_DIRECTION
            );
        });
        closeDB();
    }).catch(err => {
        console.error('Error :\n', err.message);
    });
    return wxData;
}

function closeDB() {
    sequelize.close().then(() => {
        console.log('Connection successfully closed.');
    }).catch(err => {
        console.log(`Error: ${err}`);
    });
}

// INDEX Route - show current conditions
app.get('/', (req, res) => {
    // get last database entry
    WxMeasurement.findOne({
        attributes: [
            'AMBIENT_TEMPERATURE', 'GROUND_TEMPERATURE', 'AIR_PRESSURE',
            'HUMIDITY', 'WIND_DIRECTION', 'WIND_SPEED',
            'WIND_GUST_SPEED', 'WIND_CHILL', 'HEAT_IDX', 'DEW_PT',
            'RAINFALL', 'CREATED'
        ],
        order: [['CREATED', 'DESC']]
    }).then((data) => {
        res.render('index', { data: data });
        // closeDB();
    }).catch(err => {
        console.error('Error :\n', err.message);
    });
});

/*
 * Listen for connections on port 3000
 */

app.listen(3000, () => {
    console.log('WxPi listening on port 3000...');
});

