/**
 * Model Garden Class
 * @author metachoSamuel
 */

const { sequelize } = require('../config/configDb');
const { DataTypes } = require('sequelize');

const Garden = sequelize.define('gardens', {
    id_garden: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.STRING
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
});

module.exports = Garden;
