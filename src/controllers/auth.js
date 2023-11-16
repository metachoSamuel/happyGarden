/**
 * Register and Login controller
 * @author metachoSamuel
 */

const { matchedData } = require('express-validator');
const { encrypt, compare } = require('../utils/handlePassword');
const { usersModel } = require('../models');
const { tokenSign } = require('../utils/handleJwt');
const { handleHttpError } = require('../utils/handleError');
const logger= require("../utils/logger");

const register = async (req, res) => {
    try {
        const { password, ...rest } = matchedData(req);
        const user = await usersModel.create({
            ...rest,
            password: await encrypt(password)
        });
        user.set('password', undefined, { strict: false });
        const data = {
            token: await tokenSign(user),
            user
        }
        return res.header('authorization', data).json({
            message: "Usuario autenticado",
            token: data
        })
    } catch (error) {
        logger.error(error);
        return handleHttpError(res, 'Error en auth/register', 500);
    }
};

const login = async (req, res) => {
    try {
        const { password, user_name } = matchedData(req);
        const user = await usersModel.findOne({ where: { user_name } });
        if (!user) return handleHttpError(res, 'Correo o contraseña incorrectos', 401);

        const check = await compare(password, user.password);
        if (!check) return handleHttpError(res, 'Correo o contraseña incorrectos', 401);

        user.set('password', undefined, { strict: false });

        const data = {
            token: await tokenSign(user),
            user
        };
        return res.header('authorization', data).json({
            message: "Usuario autenticado",
            token: data
        })
    } catch (error) {
        logger.error(error);
        return handleHttpError(res, 'Error en auth/login', 500);
    }
};

module.exports = { login, register }