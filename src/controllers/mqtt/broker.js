/**
 * Broker controller
 * @author metachoSamuel
 */

const mosca = require('mosca');
const { clientConnected, publishedData } = require('../../utils/mqtt/handleMqtt');
const logger = require('../../utils/logger');

const port = process.env.PORT_MOSCA || 4000;
const broker = new mosca.Server(port);

/**
 * Start Broker from mosca server
 */
const startBroker = () => {
    try {
        broker.on('clientConnected', clientConnected);
        broker.on('published', publishedData);
        broker.on('ready', () => {
            logger.info(`Server MQTT i´ts already on port ${port}}`);
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