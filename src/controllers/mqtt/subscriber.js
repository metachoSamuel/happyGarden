/**
 * Subscriber controller
 * @author metachoSamuel
 */

const mqtt = require('mqtt');
const logger = require('../../utils/logger');
const moment = require("moment");
const { Arduino, Ard_temp } = require('../../models/mqtt/arduino');

const fechaCol = moment().utc().tz('America/Bogota');
const portMosca = process.env.PORT_MOSCA || 4000;

let subscriber;


/**
 * Start subscriber
 */

const startSubscriber = () => {
    try {
        subscriber = mqtt.connect(`mqtt://localhost:${portMosca}`);
        subscriber.on('connect', () => {
            logger.info("Subscriber MQTT connected");
            subscriber.subscribe('Topic test');
        });
        createArduinoRegister();
    } catch (error) {
        logger.error(error);
    }
};

const createArduinoRegister = () => {
    try {
        subscriber.on('message', (topic, message) => {
            logger.info(message.toString());
            const dataToInsert = message.toString().split(' ');
            Arduino.create({
                description: dataToInsert[0],
                timestamp: fechaCol.format(),
                garden_id: dataToInsert[2]
            }).then(arduinoRecord => {
                return Ard_temp.create({
                    temperature: dataToInsert[1],
                    arduino_id: arduinoRecord.id_arduino
                });
            }).then(() => {
                logger.info('Registros creados con éxito.');
            }).catch(error => {
                logger.error('Error al crear registros:', error);
            });
            logger.info('Datos guardados en la base de datos');
        });
    } catch (error) {
        logger.error(error);
    }
};

const stopSub = () => {
    try {
        if (subscriber) {
            subscriber.end(() => {
                logger.info('Subscriber MQTT stop');
            });
        } else {
            logger.info('Subscriber MQTT already stopper');
        }
    } catch (error) {
        logger.error(error);
    }

}

module.exports = { startSubscriber, createArduinoRegister, stopSub }