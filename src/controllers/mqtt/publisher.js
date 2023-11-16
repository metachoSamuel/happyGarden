/**
 * Publisher controller
 * @author metachoSamuel
 */

const mqtt = require('mqtt');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const logger = require('../../utils/logger');

//const path = process.env.SERIAL_PORT || 0;
//const baudRate = parseInt(process.env.BAUD_RATE, 10) || 9600;
const portMosca = process.env.PORT_MOSCA || 4000;

//const port = new SerialPort({path: path, baudRate: baudRate});
//const parser = port.pipe(new ReadlineParser());

let publisher;


/**
 * Start Publisher
 */

const startPublisher = () => {
    try {
        publisher = mqtt.connect(`mqtt://localhost:${portMosca}`);
        publisher.on('connect', () => {
            setInterval(() => {
                const simulatedData = Math.random() * 100; // Generar valor aleatorio entre 0 y 100
                publisher.publish('Topic test', `Temperatura ${simulatedData.toString()} 2`);
            }, 10000);
        });

    } catch (error) {
        logger.error('Error to publisher', error);
    }
};

const stopPublisher = () => {
    try {
        if (publisher) {
            publisher.end(() => {
                logger.info('Publisher MQTT stop');
            });
        } else {
            logger.info('Publisher MQTT already stopper');
        }
    } catch (error) {
        logger.error('Error on stop publisher');
    }
};

module.exports = { startPublisher, stopPublisher }