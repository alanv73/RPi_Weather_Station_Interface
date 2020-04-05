const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./sqlize');

const cpu_temp = sequelize.define('WEATHER_MEASUREMENT', {
    AMBIENT_TEMPERATURE: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false
    },
    CPU_TEMP: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false
    },
    CREATED: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
});

module.exports = cpu_temp;