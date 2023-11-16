/**
 * index Route
 * @author metachoSamuel
 */

const fs = require('fs');
const { Router } = require('express');

const router = Router();

const PATH_ROUTES = __dirname;

const removeExtension = (filename) => {
    return filename.split('.').shift();
};

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file)
    if (name !== 'index') {
        if (name === 'mqtt') {
            router.use(`/mqtt/${name}`, require(`./mqtt/${name}`))
        }
        router.use(`/${name}`, require(`./${name}`))
    }
})

module.exports = router