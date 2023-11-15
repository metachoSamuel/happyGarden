/**
 * Config Database
 * @author metachoSamuel
 */

const mysql = require('mysql');
const settings = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "happyGarden"
};
let connection;

function connectDatabase() {
    if(!connection) {
        connection = mysql.createConnection(settings);
        connection.connect((err) => {
            if(!err) {
                console.log('Database connected', settings.database);
            } else {
                console.log('database connection error')
            }
        });
    }
    return connection;
}

function disconnectDatabase() {
    if(connection) {
        connection.end((err) => {
            if (err) {
                console.log('Error', err);
            } else {
                console.log('Database disconnected');
            }
        });
    }
}

module.exports = {
    connectDatabase,
    disconnectDatabase
}
