/**
 * MQTT server route
 * @author metachoSamuel
 */

const { Router } = require('express');
const authenticateUser = require('../utils/auth');
const { activateMqttServer, stopMqttServer } = require('../controllers/mqtt/serverMqtt');

const router = Router();

router.use(authenticateUser);
router.get('/', activateMqttServer);
router.get('/stop', stopMqttServer);

module.exports = router;