const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express'),
    app = express(),
    router = express.Router(),
    sequelize = require('./models/sqlize'),
    WxMeasurement = require('./models/wxmeasr');

// requiring ROUTES
const indexRoutes = require('./routes/index'),
    hourlyRoutes = require('./routes/hourly');

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

/*
 * Listen for connections on port 3000
 */

app.listen(3000, () => {
    console.log('WxPi listening on port 3000...');
});

