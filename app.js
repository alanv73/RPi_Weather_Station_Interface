const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    router = express.Router(),
    sequelize = require('./models/sqlize'),
    AvgByHour = require('./models/avgbyhour'),
    AvgByDay = require('./models/avgbyday'),
    WxMeasurement = require('./models/wxmeasr');

const port = process.env.PORT;

// requiring ROUTES
const indexRoutes = require('./routes/index'),
    dashRoutes = require('./routes/dashboard'),
    hourlyRoutes = require('./routes/hourly'),
    dailyRoutes = require('./routes/daily'),
    weeklyRoutes = require('./routes/weekly'),
    monthlyRoutes = require('./routes/monthly'),
    cpuTempRoutes = require('./routes/cputemp'),
    resumeRoutes = require('./routes/resume');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/resume'));

function closeDB() {
    sequelize.close().then(() => {
        console.log('Connection successfully closed.');
    }).catch(err => {
        console.log(`Error: ${err}`);
    });
}

/********* ROUTES **********/
// requiring route files from express router
app.use('/', indexRoutes);
app.use('/dashboard', dashRoutes);
app.use('/hourly', hourlyRoutes);
app.use('/daily', dailyRoutes);
app.use('/weekly', weeklyRoutes);
app.use('/monthly', monthlyRoutes);
app.use('/cputemp', cpuTempRoutes);
app.use('/resume', resumeRoutes);

/*
 * Listen for connections on port 3000
 */
app.listen(port || 3000, () => {
    console.log(`WxPi listening on port ${port || 3000}...`);
});

