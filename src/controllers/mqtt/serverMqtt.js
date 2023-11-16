/**
 * MQTT server controller
 * @author metachoSamuel
 */

const { startBroker, stopBroker } = require('../../controllers/mqtt/broker');
const { startPublisher, stopPublisher } = require('../../controllers/mqtt/publisher');
const { startSubscriber, stopSub } = require('../../controllers/mqtt/subscriber');
const logger = require("../../utils/logger");

const activateMqttServer = async (req, res, next) => {
    try {
        startBroker();
        startPublisher();
        startSubscriber();
        logger.info('Complete Server MQTT');
        res.json({ success: 'Broker, Publisher, subscriber and MQTT Controller started' });
        next();
    } catch (error) {
        logger.error('Activate server MQTT error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const stopMqttServer = async (req, res, next) => {
    try {
        stopBroker();
        stopPublisher();
        stopSub();
        res.json({ success: 'Broker, Publisher, subscriber and MQTT Controller stopped' });
        next();
    } catch (error) {
        logger.error('Stop server MQTT error', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    activateMqttServer,
    stopMqttServer
}