/**
 * Publisher controller
 * @author metachoSamuel
 */

const mqtt = require('mqtt');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const logger = require('../../utils/logger');

const path = process.env.SERIAL_PORT || 0;
const baudRate = process.env.BAUD_RATE || 0;
const portMosca = process.env.PORT_MOSCA || 4000;

const port = new SerialPort({path: path, baudRate: baudRate});
const parser = port.pipe(new ReadlineParser());

const publisher = mqtt.connect(`mqtt://localhost:${portMosca}`);


/**
 * Start Publisher
 */

const startPublisher = () => {
    try {
        publisher.on('connect', () => {
            parser.on('data', (data) => {
                setInterval(()=>{
                    publisher.publish('Topic test', data);
                }, 5000);
            });
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