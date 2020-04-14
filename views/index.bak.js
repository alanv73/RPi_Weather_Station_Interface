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
    let currentData;

    // get last database entry + total rain for today (so far)
    WxMeasurement.findOne({
        attributes: [
            'AMBIENT_TEMPERATURE', 'GROUND_TEMPERATURE', 'AIR_PRESSURE',
            'HUMIDITY', 'WIND_DIRECTION', 'WIND_SPEED',
            'WIND_GUST_SPEED', 'WIND_CHILL', 'HEAT_IDX', 'DEW_PT',
            'RAINFALL',
            [
                sequelize.literal(`(
                    select sum(RAINFALL) 
                    from WEATHER_MEASUREMENT 
                    where date(CREATED) = date(now()))`),
                'totalRain'
            ],
            'CREATED'
        ],
        order: [['CREATED', 'DESC']],
        raw: true
    }).then((data) => {
        // console.log(data);
        currentData = data.geta();

        // get total rain each hour for today
        WxMeasurement.findAll({
            attributes: [
                [sequelize.fn('DATE', currentDate), 'target_day'],
                [sequelize.fn('DATE', sequelize.col('CREATED')), 'created_day'],
                [sequelize.fn('HOUR', sequelize.col('CREATED')), 'hour_recorded'],
                [sequelize.fn('SUM', sequelize.col('RAINFALL')), 'rainTotal']
            ],
            where: sequelize.where(sequelize.fn('DATE', sequelize.col('CREATED')), sequelize.fn('DATE', currentDate)),
            order: [['ID', 'ASC']],
            group: sequelize.fn('HOUR', sequelize.col('CREATED')),
            raw: true
        }).then(data => {
            console.log(data);
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



    // get total rain for today
    // WxMeasurement.findOne({
    //     attributes: [
    //         [sequelize.fn('SUM', sequelize.col('RAINFALL')), 'rainTotal']
    //     ],
    //     where: sequelize.where(sequelize.fn('DATE', sequelize.col('CREATED')), sequelize.fn('DATE', '20200412')) //sequelize.fn('NOW'))),
    // }).then((data) => {
    //     // console.log(data.dataValues.rainTotal);
    //     // res.render('index', { data: data });
    //     rainToday = data;
    //     // closeDB();
    // }).catch(err => {
    //     console.error('Error :\n', err.message);
    // });

    // sequelize.query(`select AMBIENT_TEMPERATURE,GROUND_TEMPERATURE,
    //                     AIR_PRESSURE,HUMIDITY,WIND_DIRECTION,WIND_SPEED,
    //                     WIND_GUST_SPEED,WIND_CHILL,HEAT_IDX,DEW_PT,RAINFALL,
    //                     (select sum(RAINFALL) runningTotal
    //                         from WEATHER_MEASUREMENT
    //                         where date(CREATED) = date(wm.CREATED)
    //                         group by date(CREATED)) rainTotal,
    //                     CPU_TEMP,
    //                     CREATED
    //                     from WEATHER_MEASUREMENT wm
    //                     order by created desc limit 1;`,
    //     {
    //         type: sequelize.QueryTypes.SELECT,
    //         instance: WxMeasurement,
    //         model: WxMeasurement,
    //         mapToModel: true,
    //         plain: true
    //     }).then(data => {
    //         console.log(data.dataValues);
    //         console.log(data.AMBIENT_TEMPERATURE);
    //         currentData = data;
    //     }).catch(err => {
    //         console.error('Error :\n', err.message);
    //     });

});

/*
 * Listen for connections on port 3000
 */

app.listen(3000, () => {
    console.log('WxPi listening on port 3000...');
});

