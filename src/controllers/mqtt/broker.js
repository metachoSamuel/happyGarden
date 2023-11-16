/**
 * Broker controller
 * @author metachoSamuel
 */

const mosca = require('mosca');
const logger = require('../../utils/logger');
let broker;
//const port = process.env.PORT_MOSCA || 4000;

const settings = {
    port: parseInt(process.env.PORT_MOSCA) || 4000,
};


const handleClientConnected = (client) => {
    logger.info('Client connected:', client.id);
};

const handlePublishedData = (packet, client) => {
    if (!client) return;
    logger.info('Message received', client.id, ':', packet.payload.toString());
};
/**
 * Start Broker from mosca server
 */
const startBroker = () => {
    try {
        broker = new mosca.Server(settings);
        broker.on('clientConnected', handleClientConnected);
        broker.on('published', handlePublishedData);
        broker.on('ready', () => {
            logger.info(`Server MQTT i´ts already on port ${settings.port}`);
        });
    } catch (error) {
        logger.error(error);
    }
};

const stopBroker = () => {
    try {
        if (broker) {
            broker.close(() => {
                logger.info('Servidor broker stop');
            });
        } else {
            logger.info('Servidor broker already stopper.');
        }
    } catch (error) {
        logger.error('Error on stop broker server');
    }
};

module.exports = { startBroker, stopBroker }