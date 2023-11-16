/**
 * Garden route
 * @author metachoSamuel
 */

const { Router } = require('express');
const authenticateUser = require('../utils/auth');
const { createGarden, getGardens, getGarden, deleteGarden } = require('../controllers/garden');
const { validatorGetGarden, validatorCreateGarden } = require('../validators/garden');

const router = Router();

router.use(authenticateUser);
router.get('/', getGardens);
router.get('/:id', validatorGetGarden, getGarden);
router.post('/', validatorCreateGarden, createGarden);
router.delete('/:id', validatorGetGarden, deleteGarden);


module.exports = router;