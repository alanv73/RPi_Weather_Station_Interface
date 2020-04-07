const { Sequelize, Model, DataTypes } = require('sequelize');

// test server
const sequelize = new Sequelize('weather', 'alan', 'qnapn3sov', {
    host: 'athenaeum',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
        timezone: process.env.db_timezone
    },
    logging: false,
    define: {
        freezeTableName: true
    }
});

// RPi
// const sequelize = new Sequelize('weather', 'pi', 'mysqln3sov', {
//     host: 'localhost',
//     port: 3306,
//     dialect: 'mariadb',
//     dialectOptions: {
//         timezone: process.env.db_timezone
//     },
//     logging: false,
//     define: {
//         freezeTableName: true
//     }
// });

module.exports = sequelize;