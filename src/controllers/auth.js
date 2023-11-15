/**
 * Register and Login controller
 * @author metachoSamuel
 */

const { matchedData } = require('express-validator');
const { encrypt, compare } = require('../utils/handlePassword');
const { userModel } = require('../models/user');
const { tokenSign } = require('../utils/handleJwt');
const { handleHttpError } = require('../utils/handleError');
const logger= require("../utils/logger");

const register = async (req, res) => {
    try {
        const { password, ...rest } = matchedData(req);
        const user = await userModel.create({
            ...rest,
            password: await encrypt(password)
        });
        user.set('password', undefined, { strict: false });
        const data = {
            token: await tokenSign(user),
            user
        }
        return res.send({ data });
    } catch (error) {
        logger.error(error);
        return handleHttpError(res, 'Error en auth/register', 500);
    }
};

const login = async (req, res) => {
    try {
        const { password, email } = matchedData(req);
        const user = await usersModel.findOne({ where: { email } });
        if (!user) return handleHttpError(res, 'Correo o contraseña incorrectos', 401);

        const check = await compare(password, user.password);
        if (!check) return handleHttpError(res, 'Correo o contraseña incorrectos', 401);

        user.set('password', undefined, { strict: false });

        const data = {
            toke: await tokenSign(user),
            user
        };
        return res.send({ data });
    } catch (error) {
        logger.error(error);
        return handleHttpError(res, 'Error en auth/login', 500);
    }
};

module.exports = { login, register }