/**
 * Mqtt Server route
 * @author metachoSamuel
 */

const { Router } = require('express');
const { startBroker } = require('../../controllers/mqtt/broker');
const { startPublisher } = require('../../controllers/mqtt/publisher');
const { startSubscriber } = require('../../controllers/mqtt/subscriber');

const router = Router();

router.post('/startAll', startBroker, startPublisher, startSubscriber);