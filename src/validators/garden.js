const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorGetGarden =[
    check("id")
        .exists()
        .notEmpty(),
    validateResults
];


module.exports = {
    validatorGetGarden
}