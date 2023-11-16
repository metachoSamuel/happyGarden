/**
 * Garden CRUD controller
 * @author metachoSamuel
 */

const { matchedData } = require('express-validator');
const { gardensModel, usersModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const logger= require("../utils/logger");

const PUBLIC_URL = process.env.PUBLIC_URL;

/**
 * Get all gardens
 * @param {*} req
 * @param {*} res
 */
const getGardens = async (req, res) => {
    try {
        const data = await gardensModel.findAll();
        return res.send({ data });
    } catch (error) {
        logger.error(error);
        handleHttpError(res, 'Error en gardens/getGardens', 500);
    }
};

/**
 * Get Garden by ID
 * @param {*} req
 * @param {*} res
 */
const getGarden = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await gardensModel.findByPk(id);
        return res.send({ data });
    } catch (error) {
        logger.error(error);
        handleHttpError(res, 'Error en gardens/getGarden', 500);
    }
};

/**
 * Create garden
 * @param {*} req
 * @param {*} res
 */
const createGarden = async (req, res) => {
    try {
        const body = matchedData(req);
        const user_id = req.user.id;

        const data = await gardensModel.create({
            type: body.type,
            size: body.size,
            user_id: user_id,
        });

        return res.status(201).send({ data });
    } catch (error) {
        logger.error('Error durante la creación:', error);
        handleHttpError(res, 'Error en gardens/createGarden', 500);
    }
};

/**
 * Update garden
 * @param {*} req
 * @param {*} res
 */

const updateGarden = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const body = matchedData(req);
        const user_id = findUser(req, res);
        const data = await gardensModel.findByPk(id);

        if (!data || data.user_id !== user_id) {
            return handleHttpError(res, 'Jardín no encontrado o no pertenece al usuario', 404);
        }

        await data.update({
            type: body.type,
            size: body.size,
        });

        return res.send({ data });
    } catch (error) {
        logger.error('Error during update:', error);
        handleHttpError(res, 'Error en gardens/getGarden', 500);
    }
};

/**
 * Delete garden
 * @param {*} req
 * @param {*} res
 */
const deleteGarden = async (req, res) => {
    try {
        const { id } = matchedData(req);

        const user_id = findUser(req, res);
        const data = await gardensModel.findByPk(id);

        if (!data || data.user_id !== user_id) {
            return handleHttpError(res, 'Jardín no encontrado o no pertenece al usuario', 404);
        }
        await data.destroy();
        return res.send({ data });
    } catch (error) {
        logger.error('Error during update:', error);
        handleHttpError(res, 'Error en gardens/getGarden', 500);
    }
};

const findUser = async (req, res) => {
    const user = await usersModel.findOne({ where: { user_name: req.user.user_name } });

    if (!user) {
        return handleHttpError(res, 'Usuario no encontrado', 404);
    }

    return user;
};

module.exports = {
    getGardens,
    getGarden,
    createGarden,
    updateGarden,
    deleteGarden,
}





