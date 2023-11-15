/**
 * Config Database
 * @author metachoSamuel
 */

const mysql = require('mysql');
const logger = require('../utils/logger');
const settings = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "happygarden"
};
let connection;

function connectDatabase() {
    if(!connection) {
        connection = mysql.createConnection(settings);
        connection.connect((err) => {
            if(!err) {
                logger.info('Database connected', settings.database);
            } else {
                logger.error('database connection error');
            }
        });
    }
    return connection;
}

function disconnectDatabase() {
    if(connection) {
        connection.end((err) => {
            if (err) {
                logger.error('Error', err);
            } else {
                logger.info('Database disconnected');
            }
        });
    }
}

module.exports = {
    connectDatabase,
    disconnectDatabase
}
