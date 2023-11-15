/**
 * Validators Auth
 * @author metachoSamuel
 */

const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorRegister = [
    check('name').exists().notEmpty().isLength({ min: 3, max:50 }),
    check('last_name').exists().notEmpty().isLength({ min: 3, max:50 }),
    check('user_name').exists().notEmpty().isLength({ min: 3, max:50 }),
    check('email').exists().notEmpty().isEmail(),
    check('password').exists().notEmpty().isLength({ min: 3, max:15 }),
    validateResults
];

const validatorLogin = [
    check('password').exists().notEmpty().isLength({ min: 3, max: 15 }),
    check('user_name').exists().notEmpty().isLength({ min: 3, max: 15 }),
    validateResults
]

module.exports = { validatorRegister, validatorLogin }