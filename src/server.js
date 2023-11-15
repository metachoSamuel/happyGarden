/**
 * Server for HappyGarden App
 * @author metachoSamuel
 *
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./utils/logger');
const config = require('./config/configDb');

const app = express();
const PORT = 3000;
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

config.connectDatabase();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(PORT, () => {
    logger.info(`Server on http://localhost:${PORT}`);
});