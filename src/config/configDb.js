/**
 * Config Database
 * @author metachoSamuel
 */

const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');

const database = process.env.MYSQL_DATABASE
const username = process.env.MYSQL_USER
const password = process.env.MYSQL_PASSWORD
const host = process.env.MYSQL_HOST

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'mysql'
});

const connectDatabase = async () => {
    try {
        await sequelize.authenticate()
        logger.info('Database connected');
    } catch (error) {
        logger.error(`> MySQL error de conexión: ${error}`);
    }
};

module.exports = { sequelize, connectDatabase }
