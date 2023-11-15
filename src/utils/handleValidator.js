/**
 * validators handle
 * @author metachoSamuel
 *
 * @param request
 * @param res
 * @param next
 * @return function next() or ERROR
 *
 */

const { validationResult } = require('express-validator');

const validateResult = (req, res) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        return res.status(403).send({errors: error.array()});
    }
};

module.exports = validateResult;