const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express'),
    app = express(),
    router = express.Router(),
    sequelize = require('../models/sqlize'),
    WxMeasurement = require('../models/wxmeasr');

// DashBoard Route - show current conditions
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
                rainData: hourlyRain,
                temp: currentData.AMBIENT_TEMPERATURE
            });
        }).catch(err => {
            console.error('Error :\n', err.message);
        });
    }).catch(err => {
        console.error('Error :\n', err.message);
    });

});

module.exports = router;
