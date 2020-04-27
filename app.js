const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    router = express.Router(),
    sequelize = require('./models/sqlize'),
    WxMeasurement = require('./models/wxmeasr');

const port = process.env.PORT;

// requiring ROUTES
const indexRoutes = require('./routes/index'),
    hourlyRoutes = require('./routes/hourly'),
    cpuTempRoutes = require('./routes/cputemp');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

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
app.use('/hourly', hourlyRoutes);
app.use('/cputemp', cpuTempRoutes);

/*
 * Listen for connections on port 3000
 */
app.listen(port || 3000, () => {
    console.log(`WxPi listening on port ${port || 3000}...`);
});

