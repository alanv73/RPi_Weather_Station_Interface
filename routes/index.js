const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express'),
    app = express(),
    router = express.Router(),
<<<<<<< HEAD:routes/index.js
    sequelize = require('../models/sqlize'),
    WxMeasurement = require('../models/wxmeasr');
=======
    sequelize = require('./models/sqlize'),
    WxMeasurement = require('./models/wxmeasr');
const port = process.env.PORT;

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
>>>>>>> 3230c5146296bf429b4f876f7e2425476f02eb54:index.js

// INDEX Route - show current conditions
router.get('/', (req, res) => {
    let currentData;
    let rainToday;

    // get last database entry + total rain for today (so far)
    sequelize.query(
        `select *, (select sum(RAINFALL) from WEATHER_MEASUREMENT
                        where date(CREATED) = date(wm.CREATED)) totalRain
        from WEATHER_MEASUREMENT wm
        order by wm.CREATED desc
        limit 1`,
        {
            type: sequelize.QueryTypes.SELECT,
            model: WxMeasurement,
            mapToModel: true,
            raw: true
        }
    ).then((data) => {
        // console.log(data);
        currentData = data[0];
        const currentDate = new Date(data[0].CREATED);
        const condxYear = currentDate.getFullYear();
        const condxMonth = currentDate.getMonth() + 1;
        const condxDay = currentDate.getDate();
        const condxHour = currentDate.getHours();
        const condxMin = currentDate.getMinutes();
        const condxSec = currentDate.getSeconds();
        const condxDate = `${condxYear}/${String(condxMonth).padStart(2, '0')}/${String(condxDay).padStart(2, '0')} ${String(condxHour).padStart(2, '0')}:${String(condxMin).padStart(2, '0')}:${String(condxSec).padStart(2, '0')}`;

        // console.log(data[0]);
        // console.log(condxDate);

        // get total rain each hour for today
        sequelize.query(
            `select hour(CREATED) hour_recorded,
                sum(RAINFALL) rainTotal
            from WEATHER_MEASUREMENT
            where date(CREATED) = date('${condxDate}')
            group by hour(CREATED)
            order by ID desc
            limit 5`,
            {
                type: sequelize.QueryTypes.SELECT,
                model: WxMeasurement,
                mapToModel: true,
                raw: true
            }
        ).then(data => {
            // console.log(data);
            let hourlyRain = data;

            res.render('index', {
                data: currentData,
                rainData: hourlyRain
            });
        }).catch(err => {
            console.error('Error :\n', err.message);
        });
    }).catch(err => {
        console.error('Error :\n', err.message);
    });

});

<<<<<<< HEAD:routes/index.js
module.exports = router;
=======
/*
 * Listen for connections on port 3000
 */
app.listen(port || 3000, () => {
    console.log(`WxPi listening on port ${port || 3000}...`);
});

>>>>>>> 3230c5146296bf429b4f876f7e2425476f02eb54:index.js
