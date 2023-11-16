const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorGetGarden =[
    check("id")
        .exists()
        .notEmpty(),
    validateResults
];

const validatorCreateGarden =[
    check('type').exists().notEmpty().isLength({ min: 3, max:50 }),
    check('size').exists().notEmpty().isLength({ min: 1, max:50 }),
    validateResults
];


module.exports = {
    validatorGetGarden,
    validatorCreateGarden
}