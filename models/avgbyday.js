const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./sqlize');

const AvgByHour = sequelize.define('WEATHER_AVG_BY_DAY', {
    CREATED: {
        type: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: true
    },
    CREATED_DATE: {
        type: DataTypes.DATE,
        allowNull: true
    },
    AMBIENT_TEMPERATURE_MAX: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: true
    },
    AMBIENT_TEMPERATURE_MIN: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: true
    },
    GROUND_TEMPERATURE: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: true
    },
    AIR_PRESSURE: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    HUMIDITY: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    WIND_DIRECTION: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    WIND_SPEED: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    WIND_GUST_SPEED: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: true
    },
    WIND_CHILL: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: true
    },
    HEAT_IDX: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: true
    },
    DEW_PT: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    RAINFALL: {
        type: DataTypes.DECIMAL(28, 2),
        allowNull: false
    },
    CPU_TEMP: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false
    }
});

module.exports = AvgByHour;