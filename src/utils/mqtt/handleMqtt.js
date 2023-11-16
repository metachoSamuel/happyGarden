/**
 * handle mqtt broker
 * @param client
 */

const logger = require('../logger');

const clientConnected = (client) => {
   logger.info('Client connected:', client.id);
};

const publishedData = (packet, client) => {
    if (!client) return;
    logger.info('Message received', client.id, ':', packet.payload.toString());
};

module.exports = { clientConnected, publishedData }