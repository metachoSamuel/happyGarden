/**
 * Model Arduino Class
 * @author metachoSamuel
 */

const { sequelize } = require('../../config/configDb');
const { DataTypes } = require('sequelize');

const Arduino = sequelize.define('arduinos', {
    id_arduino: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    garden_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true
});

const Ard_temp = sequelize.define('ard_temps', {
    id_ard_temp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    temperature: {
        type: DataTypes.STRING,
        allowNull: false
    },
    arduino_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Arduino,
            key: 'id'
        }
    }
}, {
    timestamps: false
});


// Definir la relación entre las dos tablas
Ard_temp.belongsTo(Arduino, { foreignKey: 'arduino_id', as: 'arduinos' });
Arduino.hasMany(Ard_temp, { foreignKey: 'arduino_id', as: 'ard_temps' });


module.exports = { Arduino, Ard_temp };