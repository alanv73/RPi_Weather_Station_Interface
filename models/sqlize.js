const { Sequelize, Model, DataTypes } = require('sequelize');

// test server
// const sequelize = new Sequelize('weather', 'alan', 'qnapn3sov', {
//     host: 'athenaeum',
//     port: 3306,
//     dialect: 'mysql',
//     dialectOptions: {
//         timezone: '-04:00'
//     },
//     timezone: '-04:00',
//     define: {
//         freezeTableName: true
//     },
//     logging: false, // console.log,
//     pool: {
//         handleDisconnects: true,
//         max: 13,
//         min: 1,
//         idle: 10000,
//         acquire: 20000 // ms
//     }
// });

// RPi
const sequelize = new Sequelize('weather', 'pi', 'mysqln3sov', {
    host: '192.168.1.150',
    port: 3306,
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT+4'
    },
    logging: false,
    timezone: 'Etc/GMT+4',
    define: {
        freezeTableName: true
    },
    pool: {
        handleDisconnects: true,
        max: 13,
        min: 1,
        idle: 10000,
        acquire: 20000 // ms
    }
});

module.exports = sequelize;