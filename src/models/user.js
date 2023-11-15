/**
 * Model user Class
 * @author metachoSamuel
 */

const { sequelize } = require('../config/configDb');
const { DataTypes } = require('sequelize');

const User = sequelize.define('users', {
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {type: DataTypes.STRING},
    role: {
        type: DataTypes.ENUM(['user', 'admin']),
        defaultValue: 'user'
    }},
    {
        timestamps: true
    });

module.exports = User;